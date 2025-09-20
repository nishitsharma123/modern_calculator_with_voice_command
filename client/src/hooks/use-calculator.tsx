import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Calculation, MemoryValue } from "@shared/schema";
import { evaluate, format } from "mathjs";

export function useCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [error, setError] = useState<string>();
  const [currentMemory, setCurrentMemory] = useState<string>();
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch calculations history
  const { data: calculations = [] } = useQuery<Calculation[]>({
    queryKey: ["/api/calculations"],
  });

  // Fetch memory values
  const { data: memoryValues = [] } = useQuery<MemoryValue[]>({
    queryKey: ["/api/memory"],
  });

  // Add calculation mutation
  const addCalculationMutation = useMutation({
    mutationFn: async (data: { expression: string; result: string }) => {
      const response = await apiRequest("POST", "/api/calculations", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/calculations"] });
    },
  });

  // Add memory value mutation
  const addMemoryMutation = useMutation({
    mutationFn: async (data: { value: string }) => {
      const response = await apiRequest("POST", "/api/memory", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/memory"] });
    },
  });

  // Delete memory value mutation
  const deleteMemoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/memory/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/memory"] });
    },
  });

  // Clear history mutation
  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/calculations");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/calculations"] });
    },
  });

  // Clear memory mutation
  const clearMemoryMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/memory");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/memory"] });
      setCurrentMemory(undefined);
    },
  });

  const insertNumber = useCallback((value: string) => {
    setError(undefined);
    if (value === "pi") {
      setExpression(prev => prev + "pi");
    } else if (value === "e") {
      setExpression(prev => prev + "e");
    } else {
      setExpression(prev => prev + value);
    }
  }, []);

  const insertOperator = useCallback((operator: string) => {
    setError(undefined);
    let op = operator;
    if (operator === "×") op = "*";
    if (operator === "÷") op = "/";
    
    setExpression(prev => {
      // Handle multiplication before parentheses or functions
      if ((operator === "(" || /^[a-zA-Z]/.test(operator)) && prev && !/[\+\-\*\/\^\(\s]$/.test(prev)) {
        return prev + "*" + op;
      }
      return prev + op;
    });
  }, []);

  const insertFunction = useCallback((func: string) => {
    setError(undefined);
    if (func === "square") {
      setExpression(prev => prev + "^2");
    } else if (func === "cube") {
      setExpression(prev => prev + "^3");
    } else {
      setExpression(prev => {
        // Handle multiplication before functions
        if (prev && !/[\+\-\*\/\^\(\s]$/.test(prev)) {
          return prev + "*" + func + "(";
        }
        return prev + func + "(";
      });
    }
  }, []);

  const calculate = useCallback(() => {
    if (!expression.trim()) return;
    
    try {
      setError(undefined);
      
      // Prepare expression for mathjs
      let mathExpression = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "pi")
        .replace(/(\d)\(/g, "$1*(") // Add multiplication before parentheses
        .replace(/\)(\d)/g, ")*$1"); // Add multiplication after parentheses

      const calculatedResult = evaluate(mathExpression);
      const formattedResult = format(calculatedResult, { precision: 14 });
      
      setResult(formattedResult);
      
      // Save to history
      addCalculationMutation.mutate({
        expression: expression,
        result: formattedResult,
      });
      
    } catch (err) {
      const errorMessage = "Invalid expression";
      setError(errorMessage);
      toast({
        title: "Calculation Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [expression, addCalculationMutation, toast]);

  const clear = useCallback(() => {
    setExpression(prev => prev.slice(0, -1));
    setError(undefined);
  }, []);

  const clearAll = useCallback(() => {
    setExpression("");
    setResult("0");
    setError(undefined);
  }, []);

  const memoryStore = useCallback(() => {
    if (result && result !== "0") {
      setCurrentMemory(result);
      addMemoryMutation.mutate({ value: result });
      toast({
        title: "Memory Stored",
        description: `Value ${result} stored in memory`,
      });
    }
  }, [result, addMemoryMutation, toast]);

  const memoryRecall = useCallback(() => {
    if (currentMemory) {
      setExpression(prev => prev + currentMemory);
    } else if (memoryValues.length > 0) {
      const lastMemory = memoryValues[0];
      setExpression(prev => prev + lastMemory.value);
    }
  }, [currentMemory, memoryValues]);

  const memoryClear = useCallback(() => {
    setCurrentMemory(undefined);
    clearMemoryMutation.mutate();
    toast({
      title: "Memory Cleared",
      description: "All memory values have been cleared",
    });
  }, [clearMemoryMutation, toast]);

  const memoryAdd = useCallback(() => {
    if (result && result !== "0" && currentMemory) {
      try {
        const newValue = evaluate(`${currentMemory} + ${result}`);
        const formatted = format(newValue, { precision: 14 });
        setCurrentMemory(formatted);
        addMemoryMutation.mutate({ value: formatted });
        toast({
          title: "Memory Updated",
          description: `Added ${result} to memory`,
        });
      } catch (err) {
        toast({
          title: "Memory Error",
          description: "Failed to add to memory",
          variant: "destructive",
        });
      }
    }
  }, [result, currentMemory, addMemoryMutation, toast]);

  const memorySubtract = useCallback(() => {
    if (result && result !== "0" && currentMemory) {
      try {
        const newValue = evaluate(`${currentMemory} - ${result}`);
        const formatted = format(newValue, { precision: 14 });
        setCurrentMemory(formatted);
        addMemoryMutation.mutate({ value: formatted });
        toast({
          title: "Memory Updated",
          description: `Subtracted ${result} from memory`,
        });
      } catch (err) {
        toast({
          title: "Memory Error",
          description: "Failed to subtract from memory",
          variant: "destructive",
        });
      }
    }
  }, [result, currentMemory, addMemoryMutation, toast]);

  const loadCalculation = useCallback((calculation: Calculation) => {
    setExpression(calculation.expression);
    setResult(calculation.result);
    setError(undefined);
  }, []);

  const recallMemoryValue = useCallback((memoryValue: MemoryValue) => {
    setExpression(prev => prev + memoryValue.value);
  }, []);

  const deleteMemoryValue = useCallback((id: string) => {
    deleteMemoryMutation.mutate(id);
  }, [deleteMemoryMutation]);

  const clearHistory = useCallback(() => {
    clearHistoryMutation.mutate();
    toast({
      title: "History Cleared",
      description: "All calculation history has been cleared",
    });
  }, [clearHistoryMutation, toast]);

  const handleVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Clear commands
    if (lowerCommand.includes("clear")) {
      if (lowerCommand.includes("all")) {
        clearAll();
      } else {
        clear();
      }
      return;
    }
    
    // Calculate command
    if (lowerCommand.includes("calculate") || lowerCommand.includes("equals")) {
      calculate();
      return;
    }
    
    // Basic operations
    const operations = {
      "plus": "+",
      "add": "+",
      "minus": "-",
      "subtract": "-",
      "times": "*",
      "multiply": "*",
      "divided by": "/",
      "divide": "/",
    };
    
    let processedCommand = lowerCommand;
    
    // Replace word operations with symbols
    Object.entries(operations).forEach(([word, symbol]) => {
      processedCommand = processedCommand.replace(new RegExp(word, 'g'), ` ${symbol} `);
    });
    
    // Handle functions
    const functions = {
      "sine of": "sin(",
      "sin of": "sin(",
      "cosine of": "cos(",
      "cos of": "cos(",
      "tangent of": "tan(",
      "tan of": "tan(",
      "square root of": "sqrt(",
      "sqrt of": "sqrt(",
      "log of": "log10(",
      "logarithm of": "log10(",
      "natural log of": "log(",
      "ln of": "log(",
    };
    
    Object.entries(functions).forEach(([phrase, func]) => {
      if (processedCommand.includes(phrase)) {
        processedCommand = processedCommand.replace(phrase, func);
        // Add closing parenthesis if not present
        if (!processedCommand.includes(")")) {
          processedCommand += ")";
        }
      }
    });
    
    // Extract numbers and operations
    const mathExpression = processedCommand
      .replace(/[^\d\+\-\*\/\(\)\.\s]/g, '') // Keep only numbers and basic math
      .replace(/\s+/g, ' ')
      .trim();
    
    if (mathExpression) {
      setExpression(mathExpression);
      setError(undefined);
    }
  }, [clear, clearAll, calculate]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      
      event.preventDefault();
      
      switch (event.key) {
        case "Enter":
          calculate();
          break;
        case "Escape":
          clearAll();
          break;
        case "Backspace":
          clear();
          break;
        case "Delete":
          clearAll();
          break;
        default:
          if (/[0-9]/.test(event.key)) {
            insertNumber(event.key);
          } else if (["+", "-", "*", "/", "(", ")", "."].includes(event.key)) {
            insertOperator(event.key);
          }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [calculate, clear, clearAll, insertNumber, insertOperator]);

  return {
    expression,
    result,
    error,
    calculations,
    memoryValues,
    insertNumber,
    insertOperator,
    insertFunction,
    calculate,
    clear,
    clearAll,
    memoryStore,
    memoryRecall,
    memoryClear,
    memoryAdd,
    memorySubtract,
    loadCalculation,
    recallMemoryValue,
    deleteMemoryValue,
    clearHistory,
    handleVoiceCommand,
  };
}

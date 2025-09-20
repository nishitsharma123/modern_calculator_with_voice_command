import { Button } from "@/components/ui/button";

interface CalculatorButtonsProps {
  onNumberClick: (value: string) => void;
  onOperatorClick: (operator: string) => void;
  onFunctionClick: (func: string) => void;
  onClear: () => void;
  onClearAll: () => void;
  onCalculate: () => void;
  onMemoryStore: () => void;
  onMemoryRecall: () => void;
  onMemoryClear: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
}

export function CalculatorButtons({
  onNumberClick,
  onOperatorClick,
  onFunctionClick,
  onClear,
  onClearAll,
  onCalculate,
  onMemoryStore,
  onMemoryRecall,
  onMemoryClear,
  onMemoryAdd,
  onMemorySubtract,
}: CalculatorButtonsProps) {
  return (
    <div className="p-6">
      {/* Memory and Function Row */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        <Button
          variant="secondary"
          onClick={onMemoryStore}
          data-testid="button-memory-store"
          className="font-medium transition-all hover:scale-105"
        >
          MS
        </Button>
        <Button
          variant="secondary"
          onClick={onMemoryRecall}
          data-testid="button-memory-recall"
          className="font-medium transition-all hover:scale-105"
        >
          MR
        </Button>
        <Button
          variant="secondary"
          onClick={onMemoryClear}
          data-testid="button-memory-clear"
          className="font-medium transition-all hover:scale-105"
        >
          MC
        </Button>
        <Button
          variant="secondary"
          onClick={onMemoryAdd}
          data-testid="button-memory-add"
          className="font-medium transition-all hover:scale-105"
        >
          M+
        </Button>
        <Button
          variant="secondary"
          onClick={onMemorySubtract}
          data-testid="button-memory-subtract"
          className="font-medium transition-all hover:scale-105"
        >
          M-
        </Button>
        <Button
          variant="destructive"
          onClick={onClearAll}
          data-testid="button-clear-all"
          className="font-medium transition-all hover:scale-105"
        >
          AC
        </Button>
      </div>

      {/* Scientific Functions Row 1 */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        {[
          { label: "sin", func: "sin" },
          { label: "cos", func: "cos" },
          { label: "tan", func: "tan" },
          { label: "log", func: "log10" },
          { label: "ln", func: "log" },
          { label: "√", func: "sqrt" },
        ].map(({ label, func }) => (
          <Button
            key={label}
            variant="secondary"
            onClick={() => onFunctionClick(func)}
            data-testid={`button-function-${label}`}
            className="font-medium transition-all hover:scale-105"
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Scientific Functions Row 2 */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        <Button
          variant="secondary"
          onClick={() => onFunctionClick("square")}
          data-testid="button-function-square"
          className="font-medium transition-all hover:scale-105"
        >
          x²
        </Button>
        <Button
          variant="secondary"
          onClick={() => onFunctionClick("cube")}
          data-testid="button-function-cube"
          className="font-medium transition-all hover:scale-105"
        >
          x³
        </Button>
        <Button
          variant="secondary"
          onClick={() => onOperatorClick("^")}
          data-testid="button-operator-power"
          className="font-medium transition-all hover:scale-105"
        >
          x^y
        </Button>
        <Button
          variant="secondary"
          onClick={() => onFunctionClick("exp")}
          data-testid="button-function-exp"
          className="font-medium transition-all hover:scale-105"
        >
          e^x
        </Button>
        <Button
          variant="secondary"
          onClick={() => onNumberClick("pi")}
          data-testid="button-constant-pi"
          className="font-medium transition-all hover:scale-105"
        >
          π
        </Button>
        <Button
          variant="secondary"
          onClick={() => onNumberClick("e")}
          data-testid="button-constant-e"
          className="font-medium transition-all hover:scale-105"
        >
          e
        </Button>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1: Clear, Parentheses, Operations */}
        <Button
          variant="secondary"
          onClick={onClear}
          data-testid="button-clear"
          className="p-4 font-medium text-lg transition-all hover:scale-105"
        >
          C
        </Button>
        <Button
          variant="secondary"
          onClick={() => onOperatorClick("(")}
          data-testid="button-parenthesis-open"
          className="p-4 font-medium text-lg transition-all hover:scale-105"
        >
          (
        </Button>
        <Button
          variant="secondary"
          onClick={() => onOperatorClick(")")}
          data-testid="button-parenthesis-close"
          className="p-4 font-medium text-lg transition-all hover:scale-105"
        >
          )
        </Button>
        <Button
          variant="default"
          onClick={() => onOperatorClick("/")}
          data-testid="button-operator-divide"
          className="p-4 font-medium text-lg transition-all hover:scale-105"
        >
          ÷
        </Button>

        {/* Row 2: Numbers 7-9, Multiply */}
        {["7", "8", "9"].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => onNumberClick(num)}
            data-testid={`button-number-${num}`}
            className="p-4 font-medium text-lg transition-all hover:scale-105"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="default"
          onClick={() => onOperatorClick("*")}
          data-testid="button-operator-multiply"
          className="p-4 font-medium text-lg transition-all hover:scale-105"
        >
          ×
        </Button>

        {/* Row 3: Numbers 4-6, Subtract */}
        {["4", "5", "6"].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => onNumberClick(num)}
            data-testid={`button-number-${num}`}
            className="p-4 font-medium text-lg transition-all hover:scale-105"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="default"
          onClick={() => onOperatorClick("-")}
          data-testid="button-operator-subtract"
          className="p-4 font-medium text-lg transition-all hover:scale-105"
        >
          -
        </Button>

        {/* Row 4: Numbers 1-3, Add */}
        {["1", "2", "3"].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => onNumberClick(num)}
            data-testid={`button-number-${num}`}
            className="p-4 font-medium text-lg transition-all hover:scale-105"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="default"
          onClick={() => onOperatorClick("+")}
          data-testid="button-operator-add"
          className="p-4 font-medium text-lg transition-all hover:scale-105"
        >
          +
        </Button>

        {/* Row 5: Zero, Decimal, Equals */}
        <Button
          variant="outline"
          onClick={() => onNumberClick("0")}
          data-testid="button-number-0"
          className="p-4 font-medium text-lg transition-all hover:scale-105 col-span-2"
        >
          0
        </Button>
        <Button
          variant="outline"
          onClick={() => onOperatorClick(".")}
          data-testid="button-decimal"
          className="p-4 font-medium text-lg transition-all hover:scale-105"
        >
          .
        </Button>
        <Button
          variant="default"
          onClick={onCalculate}
          data-testid="button-calculate"
          className="p-4 font-medium text-lg transition-all hover:scale-105"
        >
          =
        </Button>
      </div>
    </div>
  );
}

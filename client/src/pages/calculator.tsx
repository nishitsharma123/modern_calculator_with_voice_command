import { Calculator as CalculatorIcon, History, Mic, Sun, Moon } from "lucide-react";
import { CalculatorDisplay } from "@/components/calculator/calculator-display";
import { CalculatorButtons } from "@/components/calculator/calculator-buttons";
import { HistoryPanel } from "@/components/calculator/history-panel";
import { VoiceRecognition } from "@/components/calculator/voice-recognition";
import { useCalculator } from "@/hooks/use-calculator";
import { useVoiceRecognition } from "@/hooks/use-voice-recognition";
import { useTheme } from "@/components/calculator/theme-provider";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

export default function Calculator() {
  const isMobile = useIsMobile();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const calculator = useCalculator();
  const voiceRecognition = useVoiceRecognition({
    onResult: calculator.handleVoiceCommand,
  });

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <title>Advanced Calculator Pro</title>
      <meta name="description" content="Modern voice-enabled scientific calculator with advanced mathematical computing capabilities, trigonometry, logarithms, and expression history." />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Calculator Panel */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-xl shadow-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <CalculatorIcon className="text-primary-foreground" size={16} />
                </div>
                <h1 className="text-lg font-semibold">Calculator Pro</h1>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Voice Command Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={voiceRecognition.toggleListening}
                  data-testid="button-voice-toggle"
                  className={voiceRecognition.isListening ? "bg-destructive hover:bg-destructive/80" : ""}
                >
                  <Mic className={`${voiceRecognition.isListening ? "animate-pulse" : ""}`} size={16} />
                </Button>
                
                {/* Theme Toggle */}
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={toggleTheme}
                  data-testid="button-theme-toggle"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
                
                {/* History Toggle (Mobile) */}
                {isMobile && (
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleHistory}
                    data-testid="button-history-toggle"
                  >
                    <History size={16} />
                  </Button>
                )}
              </div>
            </div>

            {/* Calculator Display */}
            <CalculatorDisplay
              expression={calculator.expression}
              result={calculator.result}
              error={calculator.error}
              isVoiceActive={voiceRecognition.isListening}
            />

            {/* Calculator Buttons */}
            <CalculatorButtons
              onNumberClick={calculator.insertNumber}
              onOperatorClick={calculator.insertOperator}
              onFunctionClick={calculator.insertFunction}
              onClear={calculator.clear}
              onClearAll={calculator.clearAll}
              onCalculate={calculator.calculate}
              onMemoryStore={calculator.memoryStore}
              onMemoryRecall={calculator.memoryRecall}
              onMemoryClear={calculator.memoryClear}
              onMemoryAdd={calculator.memoryAdd}
              onMemorySubtract={calculator.memorySubtract}
            />
          </div>
        </div>

        {/* History Panel */}
        <div className={`lg:col-span-1 ${isMobile ? (isHistoryOpen ? 'block' : 'hidden') : 'block'}`}>
          <HistoryPanel
            calculations={calculator.calculations}
            memoryValues={calculator.memoryValues}
            onCalculationSelect={calculator.loadCalculation}
            onMemoryRecall={calculator.recallMemoryValue}
            onMemoryDelete={calculator.deleteMemoryValue}
            onClearHistory={calculator.clearHistory}
          />
        </div>
      </div>

      {/* Voice Recognition Component */}
      <VoiceRecognition
        isListening={voiceRecognition.isListening}
        transcript={voiceRecognition.transcript}
        error={voiceRecognition.error}
      />
    </div>
  );
}

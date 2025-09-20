import { AlertCircle, Mic, MicOff } from "lucide-react";

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  error?: string;
  isVoiceActive?: boolean;
}

export function CalculatorDisplay({ expression, result, error, isVoiceActive }: CalculatorDisplayProps) {
  return (
    <div className="p-6 bg-muted/30">
      {/* Expression Input */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">Expression</div>
        <div className="bg-input rounded-lg p-4 min-h-[3rem] flex items-center" data-testid="display-expression">
          <span className="font-mono text-foreground flex-1">
            {expression || "0"}
          </span>
          <span className="ml-2 animate-pulse">|</span>
        </div>
      </div>

      {/* Result Display */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">Result</div>
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="text-right">
            {error ? (
              <div className="flex items-center justify-end gap-2 text-destructive">
                <AlertCircle size={20} />
                <span className="text-lg font-medium" data-testid="display-error">{error}</span>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold font-mono tabular-nums" data-testid="display-result">
                  {result || "0"}
                </div>
                {result && result !== "0" && (
                  <div className="text-sm text-muted-foreground mt-1" data-testid="display-result-format">
                    {parseFloat(result).toExponential(3)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Voice Status */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="voice-status">
        {isVoiceActive ? (
          <>
            <Mic className="text-primary animate-pulse" size={16} />
            <span>Voice commands: Listening...</span>
          </>
        ) : (
          <>
            <MicOff className="opacity-50" size={16} />
            <span>Voice commands: Off</span>
            <span className="text-xs bg-muted rounded px-2 py-1">Click mic to activate</span>
          </>
        )}
      </div>
    </div>
  );
}

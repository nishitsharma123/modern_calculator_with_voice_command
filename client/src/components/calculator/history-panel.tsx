import { ArrowLeft, Trash2, Clock, MemoryStick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Calculation, MemoryValue } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface HistoryPanelProps {
  calculations: Calculation[];
  memoryValues: MemoryValue[];
  onCalculationSelect: (calculation: Calculation) => void;
  onMemoryRecall: (memoryValue: MemoryValue) => void;
  onMemoryDelete: (id: string) => void;
  onClearHistory: () => void;
}

export function HistoryPanel({
  calculations,
  memoryValues,
  onCalculationSelect,
  onMemoryRecall,
  onMemoryDelete,
  onClearHistory,
}: HistoryPanelProps) {
  return (
    <div className="space-y-6">
      {/* History and MemoryStick Panel */}
      <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden h-fit">
        <div className="p-4 border-b border-border bg-muted/50">
          <h2 className="font-semibold text-lg">History & MemoryStick</h2>
        </div>

        {/* MemoryStick Section */}
        <div className="p-4 border-b border-border">
          <h3 className="font-medium text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <MemoryStick size={14} />
            MemoryStick
          </h3>
          
          {memoryValues.length === 0 ? (
            <div className="text-center text-xs text-muted-foreground py-4">
              No values stored
            </div>
          ) : (
            <div className="space-y-2">
              {memoryValues.map((memory) => (
                <div 
                  key={memory.id} 
                  className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                  data-testid={`memory-value-${memory.id}`}
                >
                  <span className="font-mono text-sm truncate flex-1">{memory.value}</span>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMemoryRecall(memory)}
                      data-testid={`button-memory-recall-${memory.id}`}
                      className="w-6 h-6 p-0"
                    >
                      <ArrowLeft className="text-primary" size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMemoryDelete(memory.id)}
                      data-testid={`button-memory-delete-${memory.id}`}
                      className="w-6 h-6 p-0"
                    >
                      <Trash2 className="text-destructive" size={12} />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="text-center text-xs text-muted-foreground">
                {memoryValues.length} item{memoryValues.length !== 1 ? 's' : ''} stored
              </div>
            </div>
          )}
        </div>

        {/* History Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm text-muted-foreground flex items-center gap-2">
              <Clock size={14} />
              Recent Calculations
            </h3>
            {calculations.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearHistory}
                data-testid="button-clear-history"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            )}
          </div>
          
          {calculations.length === 0 ? (
            <div className="text-center text-xs text-muted-foreground py-4">
              No calculations yet
            </div>
          ) : (
            <ScrollArea className="max-h-96">
              <div className="space-y-3">
                {calculations.map((calc) => (
                  <div
                    key={calc.id}
                    className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onCalculationSelect(calc)}
                    data-testid={`calculation-${calc.id}`}
                  >
                    <div className="font-mono text-sm text-muted-foreground truncate">
                      {calc.expression}
                    </div>
                    <div className="font-mono text-base font-medium mt-1 truncate">
                      {calc.result}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(calc.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>

      {/* Voice Commands Help */}
      <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/50">
          <h3 className="font-semibold">Voice Commands</h3>
        </div>
        <div className="p-4 space-y-3 text-sm">
          {[
            { command: "Calculate 2 plus 3", description: "Basic arithmetic" },
            { command: "Sin of 45 degrees", description: "Trigonometric functions" },
            { command: "Square root of 16", description: "Mathematical functions" },
            { command: "Clear calculator", description: "Control commands" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium">"{item.command}"</div>
                <div className="text-muted-foreground text-xs">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

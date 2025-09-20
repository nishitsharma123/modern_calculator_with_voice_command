import { Mic, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VoiceRecognitionProps {
  isListening: boolean;
  transcript: string;
  error?: string;
}

export function VoiceRecognition({ isListening, transcript, error }: VoiceRecognitionProps) {
  if (!isListening && !error && !transcript) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {error && (
        <Alert variant="destructive" className="mb-2" data-testid="voice-error">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {isListening && (
        <div className="bg-card border border-border rounded-lg shadow-lg p-4">
          <div className="flex items-center gap-3">
            <Mic className="text-primary animate-pulse" size={20} />
            <div>
              <div className="font-medium text-sm">Listening...</div>
              {transcript && (
                <div className="text-xs text-muted-foreground mt-1" data-testid="voice-transcript">
                  "{transcript}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

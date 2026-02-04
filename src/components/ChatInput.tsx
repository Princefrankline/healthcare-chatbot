import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, isLoading, placeholder = "Type your health question..." }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isListening, transcript, isSupported, startListening, stopListening } = useSpeechRecognition();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex gap-2 items-end p-4 bg-card/50 backdrop-blur-sm border-t border-border">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isListening ? "🎤 Listening... Speak now" : placeholder}
        disabled={isLoading}
        className={cn(
          "min-h-[44px] max-h-[120px] resize-none bg-background/80 border-border focus:ring-2 focus:ring-primary/20",
          isListening && "border-primary ring-2 ring-primary/30"
        )}
        rows={1}
      />
      
      {/* Microphone Button */}
      <Button
        type="button"
        onClick={handleMicClick}
        disabled={isLoading}
        size="icon"
        variant={isListening ? "default" : "outline"}
        className={cn(
          "h-11 w-11 shrink-0 transition-all",
          isListening 
            ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse" 
            : "hover:bg-primary/10 hover:text-primary"
        )}
        title={!isSupported ? "Speech recognition not supported" : isListening ? "Stop listening" : "Start voice input"}
      >
        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>
      
      {/* Send Button */}
      <Button
        onClick={handleSubmit}
        disabled={!input.trim() || isLoading}
        size="icon"
        className="h-11 w-11 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all hover:shadow-lg"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}
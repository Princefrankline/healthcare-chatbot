import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, TypingIndicator } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";
import { ConsultDoctor } from "./ConsultDoctor";
import { LanguageSelector } from "./LanguageSelector";
import { useHealthChat } from "@/hooks/useHealthChat";
import { useToast } from "@/hooks/use-toast";

export function ChatInterface() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    selectedLanguage,
    setSelectedLanguage,
  } = useHealthChat();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center pulse-dot">
            <span className="text-lg">🏥</span>
          </div>
          <div>
            <h2 className="font-semibold text-foreground text-sm sm:text-base">Chatbot Healthcare</h2>
            <p className="text-xs text-muted-foreground">சுகாதார உதவி • 24/7 Health Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector selected={selectedLanguage} onSelect={setSelectedLanguage} />
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearChat}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <span className="text-4xl">🩺</span>
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Welcome! வணக்கம்! 🙏
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-2">
                  I'm your AI health assistant. Ask me about disease prevention, vaccinations, 
                  government health schemes, or any health-related questions.
                </p>
                <p className="text-xs text-muted-foreground/70">
                  ⚠️ I provide health awareness only. For diagnosis, please consult a doctor.
                </p>
              </motion.div>
            )}

            {showWelcome && <QuickActions onSelect={sendMessage} disabled={isLoading} />}

            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Consult Doctor Section - shows when there are messages */}
      {messages.length > 0 && <ConsultDoctor />}

      {/* Input Area */}
      <ChatInput
        onSend={sendMessage}
        isLoading={isLoading}
        placeholder={
          selectedLanguage.code === "ta"
            ? "உங்கள் சுகாதார கேள்வியை தட்டச்சு செய்யவும்..."
            : "Type your health question..."
        }
      />
    </div>
  );
}

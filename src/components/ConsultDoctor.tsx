import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "7548857695"; // National Health Helpline
const EMERGENCY_NUMBER = "112";
const AMBULANCE_NUMBER = "108";

export function ConsultDoctor() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello, I need health guidance. Can you help me connect with a doctor?"
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handleCallClick = (number: string) => {
    window.open(`tel:${number}`, "_self");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4 p-4 rounded-xl bg-destructive/5 border border-destructive/20"
    >
      <div className="flex items-start gap-3 mb-4">
        <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground">Need Medical Help?</h3>
          <p className="text-sm text-muted-foreground mt-1">
            If you need immediate assistance or your symptoms are severe, please consult a doctor directly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button
          variant="outline"
          onClick={handleWhatsAppClick}
          className="w-full gap-2 border-success/30 text-success hover:bg-success/10 hover:text-success"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">WhatsApp</span>
        </Button>

        <Button
          variant="outline"
          onClick={() => handleCallClick(AMBULANCE_NUMBER)}
          className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">Ambulance 102</span>
        </Button>

        <Button
          variant="outline"
          onClick={() => handleCallClick(EMERGENCY_NUMBER)}
          className="w-full gap-2 border-warning/30 text-warning hover:bg-warning/10 hover:text-warning"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">Emergency 112</span>
        </Button>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <a
          href="https://www.google.com/maps/search/Primary+Health+Centre+near+me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <MapPin className="w-4 h-4" />
          Find nearest Primary Health Centre (PHC)
        </a>
      </div>
    </motion.div>
  );
}

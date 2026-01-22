import { Phone, AlertCircle, Heart } from "lucide-react";

const emergencyNumbers = [
  { label: "Emergency", number: "112" },
  { label: "Ambulance", number: "108" },
  { label: "Health Helpline", number: "1800-180-1104" },
  { label: "COVID Helpline", number: "1075" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        {/* Emergency Numbers */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Phone className="w-4 h-4 text-destructive" />
            <h3 className="font-semibold text-foreground text-sm">Emergency Numbers • அவசர எண்கள்</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {emergencyNumbers.map((item) => (
              <a
                key={item.number}
                href={`tel:${item.number.replace(/\s/g, "").split("/")[0]}`}
                className="flex flex-col items-center p-3 rounded-lg bg-destructive/5 hover:bg-destructive/10 transition-colors"
              >
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="font-semibold text-destructive">{item.number}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto mb-6 p-4 rounded-lg bg-warning/5 border border-warning/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-warning-foreground mb-1">Disclaimer • மறுப்பு</p>
              <p>
                This AI assistant provides general health awareness information only and is not a substitute 
                for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare 
                provider for medical concerns.
              </p>
              <p className="mt-1 text-muted-foreground/70">
                இந்த AI உதவியாளர் பொது சுகாதார விழிப்புணர்வு தகவல்களை மட்டுமே வழங்குகிறது. மருத்துவ கவலைகளுக்கு எப்போதும் தகுதியான மருத்துவரை அணுகவும்.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made by Poornima for a healthier India
          </p>
          <p className="mt-1">© 2024 Chatbot Healthcare • சுகாதார உதவி</p>
        </div>
      </div>
    </footer>
  );
}

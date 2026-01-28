import { motion } from "framer-motion";
import { 
  Syringe, 
  ThermometerSun, 
  MapPin, 
  Phone, 
  Baby, 
  Heart,
  Shield,
  Stethoscope
} from "lucide-react";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  labelHindi: string;
  query: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    icon: Syringe,
    label: "Vaccination",
    labelHindi: "தடுப்பூசி",
    query: "Tell me about the vaccination schedule for children in India",
    color: "bg-info/10 text-info hover:bg-info/20",
  },
  {
    icon: ThermometerSun,
    label: "Neuro",
    labelHindi: "நரம்பு மண்டலம்",
    query: "What are the nervous system related problems?",
    color: "bg-warning/10 text-warning hover:bg-warning/20",
  },
  {
    icon: Baby,
    label: "Maternal Health",
    labelHindi: "தாய் சேய் நலம்",
    query: "What are important tips for maternal and child health during pregnancy?",
    color: "bg-accent/10 text-accent hover:bg-accent/20",
  },
  {
    icon: Heart,
    label: "Heart Health",
    labelHindi: "இதய ஆரோக்கியம்",
    query: "What are the warning signs of heart disease and how can I prevent it?",
    color: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
  {
    icon: Shield,
    label: "Disease Prevention",
    labelHindi: "நோய் தடுப்பு",
    query: "How can I prevent dengue, malaria, and typhoid?",
    color: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  {
    icon: Stethoscope,
    label: "Govt. Schemes",
    labelHindi: "அரசு திட்டங்கள்",
    query: "Tell me about Ayushman Bharat and other government health schemes",
    color: "bg-success/10 text-success hover:bg-success/20",
  },
];

interface QuickActionsProps {
  onSelect: (query: string) => void;
  disabled?: boolean;
}

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="px-4 py-6">
      <p className="text-sm text-muted-foreground mb-4 text-center">Quick topics • விரைவு தலைப்புகள்</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(action.query)}
            disabled={disabled}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-border transition-all duration-200 ${action.color} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <action.icon className="w-6 h-6" />
            <div className="text-center">
              <p className="text-xs font-medium">{action.label}</p>
              <p className="text-xs opacity-70">{action.labelHindi}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

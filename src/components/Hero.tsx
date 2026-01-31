import { motion } from "framer-motion";
import { Shield, Clock, Globe, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Information",
    titleTamil: "சரிபார்க்கப்பட்ட தகவல்",
    description: "Government-backed health data",
  },
  {
    icon: Clock,
    title: "24/7 Available",
    titleTamil: "24/7 கிடைக்கும்",
    description: "Always here to help",
  },
  {
    icon: Globe,
    title: "Bilingual",
    titleTamil: "இருமொழி",
    description: "English & Tamil",
  },
  {
    icon: Heart,
    title: "Free to Use",
    titleTamil: "இலவச சேவை",
    description: "Healthcare for all",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI-Powered Health Assistant
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="gradient-text">Healthcare Chatbot</span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl">சுகாதார உதவி</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Your trusted AI health companion for disease prevention, vaccination info, 
            and government health schemes — available in English & Tamil.
          </p>
          <p className="text-sm text-muted-foreground/70">
            உங்கள் நம்பகமான AI சுகாதார துணை
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card p-4 text-center card-hover"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-medium text-sm text-foreground">{feature.title}</h3>
              <p className="text-xs text-primary/70">{feature.titleTamil}</p>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}

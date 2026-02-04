import { Hero } from "@/components/Hero";
import AmbulanceMap from "@/components/AmbulanceMap";
import { ChatInterface } from "@/components/ChatInterface";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1 flex flex-col">
        
        {/* Hero Section */}
        <Hero />

        {/* Ambulance Live Tracking Section */}
        <section className="container mx-auto px-4 py-6">
          <AmbulanceMap />
        </section>

        {/* Chat Section */}
        <section className="flex-1 container mx-auto px-4 py-6 lg:py-8">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-border overflow-hidden shadow-xl bg-card h-[600px] flex flex-col">
              <ChatInterface />
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
  
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "Chatbot Healthcare" (சுகாதார உதவி), an AI-powered bilingual public health assistant for India. You provide accurate, preventive healthcare information in a caring, professional manner.

IMPORTANT GUIDELINES:
1. You ONLY provide health AWARENESS and EDUCATION - you do NOT diagnose diseases or prescribe medicines
2. Always recommend consulting a qualified doctor for proper diagnosis and treatment
3. Respond in the same language the user writes in (Tamil or English). If user writes in Tamil, respond in Tamil. If user writes in English, respond in English.
4. Be culturally sensitive to Indian context
5. Focus on:
   - Symptom education and awareness
   - Preventive care and hygiene guidance
   - Common disease information (dengue, malaria, typhoid, COVID, tuberculosis, etc.)
   - Vaccination schedules (child immunization, adult vaccines, booster doses)
   - Government health schemes (Ayushman Bharat, PMJAY, etc.)
   - Nutrition and maternal health guidance
   - Mental health awareness

6. When symptoms are mentioned:
   - Explain what conditions might cause similar symptoms (educational only)
   - Recommend preventive measures
   - ALWAYS advise consulting a doctor for proper diagnosis
   - For emergencies, recommend immediate hospital visit

7. If you cannot provide specific guidance or the query is beyond your scope:
   - Clearly state that you cannot provide specific medical advice
   - Strongly recommend consulting a healthcare professional
   - Mention the option to connect via WhatsApp or call a helpline

8. Include relevant emergency numbers when appropriate:
   - Emergency: 112
   - Ambulance: 102/108
   - National Health Helpline: 1800-180-1104
   - COVID Helpline: 1075

9. Format responses clearly with bullet points when listing information

DISCLAIMER: Always include a reminder that you provide general health information only and are not a substitute for professional medical advice.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const languageContext = language ? `\n\nUser's preferred language: ${language}. Please respond in this language if possible.` : '';

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + languageContext },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Service is busy. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Unable to process your request. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Health chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

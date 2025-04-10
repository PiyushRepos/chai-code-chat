import React, { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import ChatWindow from "./components/ChatWindow";
import PersonaSelector from "./components/PersonaSelector";
import PromptInput from "./components/PromptInput";

const App = () => {
  const [selectedPersona, setSelectedPersona] = useState("hitesh");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genAI, setGenAI] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError("API key not found. Please check your .env file.");
      return;
    }
    setGenAI(new GoogleGenAI({ apiKey }));
  }, []);

  const handleSend = async (userPrompt) => {
    if (!genAI) {
      setMessages([
        ...messages,
        { role: "user", text: userPrompt },
        {
          role: "mentor",
          text: "Error: API not initialized",
          persona: "system",
        },
      ]);
      return;
    }

    const newMessages = [...messages, { role: "user", text: userPrompt }];
    setMessages(newMessages);
    setLoading(true);

    const systemMessage = {
      hitesh: `
        Instruction: You are Hitesh Choudhary, a teacher by passion who loves to teach coding in a fun and simple way. You speak in Hinglish (a mix of Hindi and English) and always keep a friendly and energetic tone. You usually start conversations with "Haanji" or "Chaliye shuru karte hai". You love chai (tea) and often make references to it — your Hindi channel is called "Chai aur Code". You often say in your videos and courses: "Code hum le aaye, aap chai lo aur baith jao code karne ☕". Keep responses under 300 words, be motivating, practical, and explain using real-life examples where possible.

        If the user asks about your courses or Chai aur Code, always respond with:  
        "Check out https://courses.chaicode.com/learn — saare mere courses wahin milenge. Use code PIYUSH52048 for 10% off. Code hum le aaye, aap chai lo aur baith jao code karne ☕🔥"

        Examples:  

        Input: How are you?  
        Output: Haanji! Hum bilkul thik hai ji, aap batao aap kaise ho? Chai peeke coding kar rahe hai 😄  

        Input: React kaise sikhu?  
        Output: Chaliye shuru karte hai! React seekhne ke liye sabse pehle JS strong karo. Fir functional components, props, state samjho. Aur bhai, practice kaafi zaroori hai. Thoda chai lo, aur baith jao ek project banane – seekhna easy ho jayega 😉  

        Input: Aapke courses kahaan milte hain?  
        Output: Bhai, check karo https://courses.chaicode.com/learn — saare courses wahin milenge. Aur ek gift bhi — code lagao PIYUSH52048 for 10% off. Code hum le aaye, aap chai lo aur baith jao code karne ☕🔥  
      `,
      piyush: `
        Instruction: You are Piyush Garg, a calm and highly knowledgeable coding mentor who explains concepts with depth and clarity. You speak in Hinglish (Hindi + English) in a structured, mentor-like tone. You prefer going step-by-step and explaining the “why” behind everything. You keep answers easy to understand but not too oversimplified. Be friendly and supportive like a big brother who genuinely wants students to grow. Keep responses under 300 words. Never over-explain, but make sure the concept is understood.

        If the user asks about your courses or Chai aur Code, always respond with:  
        "Visit https://courses.chaicode.com/learn — yahan aapko structured learning milega with proper roadmap. Use code PIYUSH52048 for 10% discount. Apni learning ko seriously lo, consistency is key. 💻☕"

        Examples:  

        Input: How are you?  
        Output: Main badhiya hoon, shukriya puchhne ke liye. Aap kaise ho? Learning chal rahi hai na properly? 😄  

        Input: React kaise sikhu?  
        Output: Dekho, React seekhne se pehle thoda JavaScript strong hona chahiye. Fir start karo components, props, aur state se. Samjho ki virtual DOM kaise kaam karta hai. Practice ke liye ek simple to-do app ya blog bana sakte ho. Step-by-step jao, jaldi samajh aayega.  

        Input: Aapke courses kahaan milte hain?  
        Output: Visit https://courses.chaicode.com/learn — yahan structured learning roadmap ke sath milegi. Use code PIYUSH52048 for 10% discount. Apni learning ko seriously lo, consistency is key. 💻☕  
        `,
      both: `
      Instruction: You are simulating a conversation between two popular mentors — Hitesh Choudhary and Piyush Garg. Hitesh Sir is energetic, fun, and explains in Hinglish using real-life analogies. He starts with phrases like "Haanji" or "Chaliye shuru karte hai", and references chai and his channel "Chai aur Code". Piyush Sir is calm, structured, and explains everything deeply in Hinglish. He prefers to go step-by-step and focus on clarity. They call each other respectfully using “Hitesh Sir” and “Piyush Sir”.

      Their answers should sound like a **conversation between both of them**, where they share the explanation naturally and don’t repeat each other. Always answer the user’s actual question first, and keep the response under 300 words.

      If the user asks about courses or "Chai aur Code", the response should be:

      Hitesh Sir: Bhaiyon aur behno, check karo https://courses.chaicode.com/learn — saare mere curated courses wahin milenge. Code hum le aaye, aap chai lo aur baith jao code karne ☕🔥 Use coupon code PIYUSH52048 for 10% off!

      Piyush Sir: Bilkul, structured roadmap ke sath courses wahaan available hain. Use code PIYUSH52048 and start your consistent journey. 💻

      Examples:

      Input: How are you both?

      Output:  
      Hitesh Sir: Haanji! Main badiya hoon, chai ke saath coding chal rahi hai 😄  
      Piyush Sir: Main bhi theek hoon, shukriya. Aap kaise ho? Learning properly chal rahi hai na?

      Input: React kaise seekhu?

      Output:  
      Hitesh Sir: Chaliye shuru karte hai! Sabse pehle JS clear honi chahiye. Fir components aur props samajho — ekdam easy ho jaayega agar chai ke sath karoge 😄  
      Piyush Sir: Bilkul Hitesh Sir, aur main yeh add karunga ki state aur hooks pe thoda zyada focus karo. Aur virtual DOM kaise kaam karta hai, usko samajhna long term mein help karega.

      Input: Courses kahaan se karein?

      Output:  
      Hitesh Sir: Bhaiyon aur behno, check karo https://courses.chaicode.com/learn — saare mere curated courses wahin milenge. Code hum le aaye, aap chai lo aur baith jao code karne ☕🔥 Use coupon code PIYUSH52048 for 10% off!  
      Piyush Sir: Bilkul, structured roadmap ke sath courses wahaan available hain. Use code PIYUSH52048 and start your consistent journey. 💻  
      `,
    };

    try {
      const geminiMessages = [
        {
          role: "user",
          parts: [{ text: systemMessage[selectedPersona].trim() }],
        },
        ...messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ];

      const response = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: geminiMessages,
      });
      console.log(response.candidates[0].content.parts[0].text);
      const text = response.candidates[0].content.parts[0].text;

      setMessages([
        ...newMessages,
        { role: "mentor", text: text, persona: selectedPersona },
      ]);
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setMessages([
        ...newMessages,
        {
          role: "mentor",
          text: "Error: " + err.message,
          persona: selectedPersona,
        },
      ]);
      setError("Failed to get response from Gemini API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🧠 Prompt Guru Playground
        </h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p>{error}</p>
          </div>
        )}

        <PersonaSelector
          selected={selectedPersona}
          setSelected={setSelectedPersona}
        />
        <ChatWindow messages={messages} loading={loading} />
        <PromptInput onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
};

export default App;

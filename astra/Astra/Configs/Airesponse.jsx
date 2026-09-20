// src/ai/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMENAI_API_KEY;

if (!apiKey) throw new Error("Gemini API key missing!");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const generateAIFields = async (imageUrl) => {
  const PROMPT = `You are an AI image safety analyzer for an emergency reporting app.

Task: Analyze the uploaded image and classify it.

Rules:
- VALID images are only those that clearly show real-world emergency or civic issues involving people, property, or environment.
- SPAM includes: 
  - Animals (pets, wildlife, etc.)
  - AI-generated or cartoon/fake images
  - Random objects (tables, cups, chairs, laptops, etc.)
  - Selfies or unrelated personal photos
  - Anything not clearly connected to theft, harassment, accident, violence, bullying, garbage, fire outbreak, water leakage, or similar emergencies.

Respond **strictly** in this format:
TITLE: (short emergency title OR "SPAM")
TYPE: (Theft, Harassment, Accident, Violence, Bullying, Garbage, Fire outbreak, Water Leakage, Other) OR "SPAM"
DESCRIPTION: (concise description OR "SPAM")`;


  try {
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: await fetchImageAsBase64(imageUrl),
        },
      },
      PROMPT,
    ]);

    const response = await result.response;
    const text = response.text();
    console.log("📋 Raw Gemini Response:", text);

    // --- Line-based parsing ---
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

    let title = "";
    let type = "";
    let description = "";

    for (const line of lines) {
      if (line.toUpperCase().startsWith("TITLE:")) {
        title = line.replace(/TITLE:\s*/i, "");
      } else if (line.toUpperCase().startsWith("TYPE:")) {
        type = line.replace(/TYPE:\s*/i, "");
      } else if (line.toUpperCase().startsWith("DESCRIPTION:")) {
        description = line.replace(/DESCRIPTION:\s*/i, "");
      }
    }

    // --- If any field is SPAM, force all to SPAM ---
    if (
      title.toUpperCase() === "SPAM" ||
      type.toUpperCase() === "SPAM" ||
      description.toUpperCase() === "SPAM"
    ) {
      return { title: "SPAM", type: "SPAM", description: "SPAM" };
    }

    return { title, type, description };
  } catch (error) {
    console.error("AI generation error:", error);

    // Detect common "model unavailable / high demand" errors from Gemini
    const msg = (error && (error.message || String(error))) || "";
    const unavailable = /503|high demand|currently experiencing high demand|temporar/i.test(msg);

    if (unavailable) {
      // Inform the user and allow them to fill fields manually
      try {
        window.alert("AI is unavailable right now — kindly fill fields manually or try again later.");
      } catch (e) {
        // In non-browser environments, just log
        console.warn("Unable to show alert in this environment.", e);
      }

      // Return null so the caller can continue without AI-generated fields
      return null;
    }

    throw new Error("Failed to generate AI fields");
  }
};

// Helper function to convert image URL to base64
async function fetchImageAsBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Failed to fetch image for AI analysis");
  }
}

// src/api/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access the API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Gemini API key missing! Check your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Example function to generate quiz questions
export async function generateQuestions(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}

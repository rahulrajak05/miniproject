// src/api/quizAPI.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Load your Gemini API key from .env file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

// Function to generate questions using Gemini
export const generateQuestions = async (topic, subtopic, numQuestions) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Generate ${numQuestions} multiple-choice computer science questions
      on topic "${topic}" and subtopic "${subtopic}".
      Format output strictly as valid JSON like this:
      [
        {
          "id": 1,
          "text": "Question text",
          "choices": ["A", "B", "C", "D"],
          "correct": "A"
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Try parsing JSON
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    const questions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

    return questions;
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
};

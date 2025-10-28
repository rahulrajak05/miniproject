import React, { useState } from "react";
import { generateQuestions } from "../api/gemini";

const QuizGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateQuestions(prompt);
      setOutput(result);
    } catch (error) {
      setOutput("Failed to generate questions. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz Generator (Gemini)</h1>
      <textarea
        className="w-full border rounded-lg p-3 mb-3"
        rows="4"
        placeholder="Enter your topic or prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {output && (
        <div className="mt-4 p-3 border rounded-lg bg-gray-50 whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;

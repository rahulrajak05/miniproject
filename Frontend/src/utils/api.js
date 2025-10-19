import axios from "axios";

export const fetchLeetCodeQuestions = async () => {
  try {
    const response = await axios.get(
      "https://leetcode-api-faisalshohag.vercel.app/all"
    );
    // Returns list of problems
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

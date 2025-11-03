export const getLoggedInEmail = () => {
  try {
    const q = JSON.parse(localStorage.getItem("quizuser") || "null");
    const u = JSON.parse(localStorage.getItem("user") || "null");
    return (q && q.email) || (u && u.email) || "";
  } catch {
    return "";
  }
};

export const getUserName = () => {
  try {
    const profile = JSON.parse(localStorage.getItem("userProfile") || "null");
    if (profile && profile.name) return profile.name;
  } catch {}
  return localStorage.getItem("userName") || "Guest";
};

export const saveToLeaderboard = ({ name, email, score, total, topic }) => {
  try {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const entry = {
      name: name || getUserName(),
      email: (email ?? getLoggedInEmail()) || "",
      score: Number(score) || 0,
      total: Number(total) || 0,
      topic: topic || "Computer Science",
      date: new Date().toLocaleString(),
    };
    const updated = [...leaderboard, entry];
    localStorage.setItem("leaderboard", JSON.stringify(updated));
    return entry;
  } catch (err) {
    console.error("Failed to save leaderboard entry:", err);
    return null;
  }
};

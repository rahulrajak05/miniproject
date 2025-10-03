import { questions } from "../data/questions";

let lastIndex = -1;
console.log("Filtered Questions:", filtered);
console.log("Random Pick:", filtered[randomIndex]);

export function getRandomQuestion(difficulty = null) {
  let filtered = questions;

  // filter by difficulty if passed
  if (difficulty) {
    filtered = questions.filter(
      (q) => q.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }

  if (filtered.length === 0) return null;

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * filtered.length);
  } while (randomIndex === lastIndex && filtered.length > 1);

  lastIndex = randomIndex;
  return filtered[randomIndex];
}

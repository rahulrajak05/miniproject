// Local topic question bank used to seed quizzes when API results are sparse.
// Each topic array contains objects: { question, options: string[], answer }

export const questionBank = {
  "Computer Networks": [
    {
      question: "Which device operates at the Network layer of the OSI model?",
      options: ["Switch", "Router", "Bridge", "Hub"],
      answer: "Router",
    },
    {
      question: "Which protocol is used for secure web browsing?",
      options: ["HTTP", "HTTPS", "FTP", "Telnet"],
      answer: "HTTPS",
    },
    {
      question: "What is the default port for DNS?",
      options: ["21", "25", "53", "110"],
      answer: "53",
    },
  ],

  "Operating System": [
    {
      question: "Which of the following is not a scheduling algorithm?",
      options: ["FCFS", "SSTF", "Round Robin", "RSA"],
      answer: "RSA",
    },
    {
      question: "Deadlock requires which condition(s)?",
      options: [
        "Mutual exclusion",
        "Hold and wait",
        "No preemption and circular wait",
        "All of the above",
      ],
      answer: "All of the above",
    },
    {
      question: "Which memory management technique suffers from external fragmentation?",
      options: ["Paging", "Segmentation", "Demand Paging", "None"],
      answer: "Segmentation",
    },
  ],

  "Database": [
    {
      question: "Which normal form removes partial dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: "2NF",
    },
    {
      question: "Which SQL command is used to remove a table and its data?",
      options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"],
      answer: "DROP",
    },
    {
      question: "Which of the following is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      answer: "MongoDB",
    },
  ],

  "Web Development": [
    {
      question: "Which HTML tag is used to link a stylesheet?",
      options: ["<style>", "<script>", "<link>", "<meta>"],
      answer: "<link>",
    },
    {
      question: "Which HTTP method is idempotent?",
      options: ["POST", "PATCH", "GET", "CONNECT"],
      answer: "GET",
    },
    {
      question: "Which CSS property changes the text color?",
      options: ["background", "font-weight", "color", "display"],
      answer: "color",
    },
  ],

  "Artificial Intelligence": [
    {
      question: "Which algorithm is used to find the shortest path in a weighted graph with non-negative weights?",
      options: ["DFS", "BFS", "Dijkstra's", "Prim's"],
      answer: "Dijkstra's",
    },
    {
      question: "Which of these is a supervised learning task?",
      options: ["Clustering", "Classification", "Dimensionality Reduction", "Association"],
      answer: "Classification",
    },
    {
      question: "What does NLP stand for?",
      options: [
        "Natural Learning Process",
        "Neural Language Processing",
        "Natural Language Processing",
        "Non-Linear Programming",
      ],
      answer: "Natural Language Processing",
    },
  ],
};

// src/data/theoryQuestions.js
export const data1 = [
  // --- Data Structures ---
  {
    id: 1,
    title: "What is a Binary Tree?",
    topic: "Data Structures",
    description: "A binary tree is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child.",
    examples: ["Example: A tree with root 1, left child 2, right child 3."],
    answer: "Binary trees are used in search operations (BST), heap structures, and recursive algorithms."
  },
  {
    id: 2,
    title: "What is a Linked List?",
    topic: "Data Structures",
    description: "A linked list is a linear data structure where each element is a separate object containing a data part and a reference to the next node.",
    examples: ["Example: 1 -> 2 -> 3 -> NULL"],
    answer: "Linked lists are dynamic, allow easy insertion/deletion, but have slower access compared to arrays."
  },
  {
    id: 3,
    title: "Explain Stack and Queue",
    topic: "Data Structures",
    description: "Stack is LIFO (Last In First Out), Queue is FIFO (First In First Out).",
    examples: ["Stack: push(1), push(2), pop() => 2", "Queue: enqueue(1), enqueue(2), dequeue() => 1"],
    answer: "Stacks are used in recursion, expression evaluation; Queues are used in scheduling, buffering."
  },
  {
    id: 4,
    title: "Explain Hash Tables",
    topic: "Data Structures",
    description: "Hash tables store key-value pairs and use a hash function to map keys to buckets.",
    examples: [],
    answer: "Used for fast data retrieval, O(1) average lookup, collision handled via chaining or probing."
  },
  {
    id: 5,
    title: "Explain Graph and its types",
    topic: "Data Structures",
    description: "A graph is a collection of nodes (vertices) connected by edges. Types: directed, undirected, weighted, unweighted.",
    examples: [],
    answer: "Graphs are used in networking, pathfinding algorithms, and social networks."
  },

  // --- Operating System ---
  {
    id: 6,
    title: "What is a Process?",
    topic: "Operating System",
    description: "A process is a program in execution, including its current values, program counter, and resources.",
    examples: [],
    answer: "Processes are independent, have their own memory, and are managed by the OS scheduler."
  },
  {
    id: 7,
    title: "Difference between Process and Thread",
    topic: "Operating System",
    description: "Process is an independent program execution unit; Thread is a lightweight sub-process within a process.",
    examples: [],
    answer: "Threads share memory of the parent process, allowing efficient multitasking."
  },
  {
    id: 8,
    title: "What is Deadlock?",
    topic: "Operating System",
    description: "Deadlock is a state in which a set of processes are blocked because each process is holding a resource and waiting for another resource.",
    examples: [],
    answer: "Deadlocks are handled via prevention, avoidance, detection, and recovery methods."
  },
  {
    id: 9,
    title: "Explain Virtual Memory",
    topic: "Operating System",
    description: "Virtual memory is a memory management technique that gives an application the illusion of a large contiguous memory.",
    examples: [],
    answer: "OS uses paging or segmentation to map virtual addresses to physical memory."
  },
  {
    id: 10,
    title: "What is Context Switching?",
    topic: "Operating System",
    description: "Context switching is the process of storing and restoring the state of a CPU so that multiple processes can share a single CPU resource.",
    examples: [],
    answer: "It allows multitasking, but excessive switching can reduce performance."
  },

  // --- Networking ---
  {
    id: 11,
    title: "What is TCP vs UDP?",
    topic: "Networking",
    description: "TCP is connection-oriented, reliable; UDP is connectionless, faster but unreliable.",
    examples: [],
    answer: "TCP is used for file transfer, email; UDP for streaming and gaming."
  },
  {
    id: 12,
    title: "What is IP Address?",
    topic: "Networking",
    description: "An IP address is a unique identifier assigned to devices on a network.",
    examples: ["IPv4: 192.168.0.1", "IPv6: 2001:0db8:85a3::8a2e:0370:7334"],
    answer: "Used for addressing and routing packets over the network."
  },
  {
    id: 13,
    title: "Explain DNS",
    topic: "Networking",
    description: "Domain Name System (DNS) translates domain names into IP addresses.",
    examples: [],
    answer: "It enables humans to use readable names instead of numeric IP addresses."
  },
  {
    id: 14,
    title: "Explain HTTP vs HTTPS",
    topic: "Networking",
    description: "HTTP is unsecured; HTTPS uses SSL/TLS for encryption and secure communication.",
    examples: [],
    answer: "HTTPS ensures data integrity and privacy during transfer."
  },
  {
    id: 15,
    title: "What is Subnetting?",
    topic: "Networking",
    description: "Subnetting divides a network into smaller subnetworks to improve efficiency and security.",
    examples: [],
    answer: "Subnet masks help determine network and host portions of an IP address."
  },

  // --- OOP ---
  {
    id: 16,
    title: "What is Object-Oriented Programming?",
    topic: "OOP",
    description: "OOP is a programming paradigm using objects and classes to model real-world entities.",
    examples: [],
    answer: "Supports encapsulation, inheritance, polymorphism, and abstraction."
  },
  {
    id: 17,
    title: "Explain Inheritance",
    topic: "OOP",
    description: "Inheritance allows a class to acquire properties and behaviors of another class.",
    examples: [],
    answer: "Enables code reuse and hierarchical relationships."
  },
  {
    id: 18,
    title: "Explain Polymorphism",
    topic: "OOP",
    description: "Polymorphism allows objects of different types to be treated as objects of a common super type.",
    examples: [],
    answer: "Types: compile-time (method overloading) and runtime (method overriding)."
  },
  {
    id: 19,
    title: "What is Encapsulation?",
    topic: "OOP",
    description: "Encapsulation is the technique of restricting direct access to some object’s components.",
    examples: [],
    answer: "Achieved using access specifiers like private, protected, and public."
  },
  {
    id: 20,
    title: "What is Abstraction?",
    topic: "OOP",
    description: "Abstraction hides implementation details and exposes only functionality.",
    examples: [],
    answer: "Helps reduce complexity and improve code maintainability."
  },

  // --- DBMS ---
  {
    id: 21,
    title: "What is a Primary Key?",
    topic: "DBMS",
    description: "A primary key is a unique identifier for a database record.",
    examples: [],
    answer: "No two rows can have the same primary key value."
  },
  {
    id: 22,
    title: "What is a Foreign Key?",
    topic: "DBMS",
    description: "A foreign key is a field in one table that uniquely identifies a row in another table.",
    examples: [],
    answer: "Used to maintain referential integrity between tables."
  },
  {
    id: 23,
    title: "Explain Normalization",
    topic: "DBMS",
    description: "Normalization is the process of organizing data to reduce redundancy.",
    examples: [],
    answer: "Forms: 1NF, 2NF, 3NF, BCNF."
  },
  {
    id: 24,
    title: "Difference between SQL and NoSQL",
    topic: "DBMS",
    description: "SQL databases are relational; NoSQL databases are non-relational and flexible.",
    examples: [],
    answer: "SQL is good for structured data, NoSQL for unstructured or big data applications."
  },
  {
    id: 25,
    title: "What is ACID property?",
    topic: "DBMS",
    description: "ACID stands for Atomicity, Consistency, Isolation, Durability.",
    examples: [],
    answer: "Ensures reliable transaction processing in databases."
  },

  // You can continue adding up to 50+ questions in the same format
];

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
    {
    id: 26,
    title: "What is CPU Scheduling?",
    topic: "Operating System",
    description: "CPU scheduling decides the order in which processes access the CPU.",
    examples: [],
    answer: "Algorithms: FCFS, SJF, Priority, Round Robin."
  },
  {
    id: 27,
    title: "What is Paging?",
    topic: "Operating System",
    description: "Paging divides memory into fixed-size pages and maps them to frames in physical memory.",
    examples: [],
    answer: "Eliminates external fragmentation and enables virtual memory."
  },
  {
    id: 28,
    title: "What is Segmentation?",
    topic: "Operating System",
    description: "Segmentation divides memory into variable-size segments based on logical divisions.",
    examples: [],
    answer: "Helps in modular programming and easier memory protection."
  },
  {
    id: 29,
    title: "What is Thrashing?",
    topic: "Operating System",
    description: "Thrashing occurs when excessive paging slows down system performance.",
    examples: [],
    answer: "It happens when the working set of processes cannot fit in memory."
  },
  {
    id: 30,
    title: "What is a Scheduler?",
    topic: "Operating System",
    description: "A scheduler selects which process runs next on the CPU.",
    examples: [],
    answer: "Types: Long-term, Medium-term, Short-term."
  },
  {
    id: 31,
    title: "Explain Semaphore",
    topic: "Operating System",
    description: "A semaphore is a synchronization primitive used to control access to shared resources.",
    examples: [],
    answer: "Can be binary (mutex) or counting semaphore."
  },
  {
    id: 32,
    title: "What is a Mutex?",
    topic: "Operating System",
    description: "A mutex is a lock used to ensure mutual exclusion of processes.",
    examples: [],
    answer: "Used to prevent race conditions in critical sections."
  },
  {
    id: 33,
    title: "What is Starvation?",
    topic: "Operating System",
    description: "Starvation occurs when a process waits indefinitely for resources.",
    examples: [],
    answer: "Occurs due to low priority in scheduling or unfair resource allocation."
  },
  {
    id: 34,
    title: "Explain OS File Systems",
    topic: "Operating System",
    description: "File system manages data storage and retrieval on disks.",
    examples: [],
    answer: "Examples: FAT, NTFS, ext4."
  },
  {
    id: 35,
    title: "What is Multithreading?",
    topic: "Operating System",
    description: "Multithreading allows multiple threads to run concurrently within a process.",
    examples: [],
    answer: "Improves CPU utilization and responsiveness."
  },
  {
    id: 36,
    title: "Explain Deadlock Prevention",
    topic: "Operating System",
    description: "Techniques to ensure deadlocks do not occur.",
    examples: [],
    answer: "Methods: resource ordering, hold and wait avoidance."
  },
  {
    id: 37,
    title: "Explain Deadlock Avoidance",
    topic: "Operating System",
    description: "Techniques to avoid deadlocks dynamically.",
    examples: [],
    answer: "Banker's algorithm is a common method."
  },
  {
    id: 38,
    title: "Explain Deadlock Detection",
    topic: "Operating System",
    description: "Methods to detect deadlocks after they occur.",
    examples: [],
    answer: "Use wait-for graphs to identify cycles."
  },
  {
    id: 39,
    title: "Explain Page Replacement Algorithms",
    topic: "Operating System",
    description: "Algorithms decide which page to remove when memory is full.",
    examples: [],
    answer: "Examples: FIFO, LRU, Optimal."
  },
  {
    id: 40,
    title: "What is OS Kernel?",
    topic: "Operating System",
    description: "The kernel is the core part of OS managing resources and hardware.",
    examples: [],
    answer: "Types: Monolithic, Microkernel."
  },
  {
    id: 41,
    title: "Explain Swapping",
    topic: "Operating System",
    description: "Swapping moves processes between main memory and disk.",
    examples: [],
    answer: "Used to free memory and improve CPU utilization."
  },
  {
    id: 42,
    title: "What is Real-Time OS?",
    topic: "Operating System",
    description: "RTOS guarantees response within a strict time constraint.",
    examples: [],
    answer: "Used in embedded systems, medical devices, robotics."
  },
  {
    id: 43,
    title: "Explain Interrupts",
    topic: "Operating System",
    description: "Interrupts notify CPU of an event needing immediate attention.",
    examples: [],
    answer: "Types: Hardware and Software interrupts."
  },
  {
    id: 44,
    title: "Explain OS Memory Allocation",
    topic: "Operating System",
    description: "Memory allocation assigns memory to processes.",
    examples: [],
    answer: "Methods: Contiguous, Non-contiguous (paging, segmentation)."
  },
  {
    id: 45,
    title: "What is I/O Scheduling?",
    topic: "Operating System",
    description: "I/O scheduling determines the order of I/O requests.",
    examples: [],
    answer: "Algorithms: FCFS, SSTF, SCAN, C-SCAN."
  },
  {
    id: 46,
    title: "What is OSI Model?",
    topic: "Networking",
    description: "The OSI model is a conceptual framework that standardizes the functions of a telecommunication system into seven layers.",
    examples: [],
    answer: "Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application."
  },
  {
    id: 47,
    title: "Explain TCP Handshake",
    topic: "Networking",
    description: "TCP uses a three-way handshake to establish a connection.",
    examples: [],
    answer: "Steps: SYN → SYN-ACK → ACK."
  },
  {
    id: 48,
    title: "What is ARP?",
    topic: "Networking",
    description: "Address Resolution Protocol (ARP) maps IP addresses to MAC addresses.",
    examples: [],
    answer: "Used to deliver packets within a LAN."
  },
  {
    id: 49,
    title: "What is NAT?",
    topic: "Networking",
    description: "Network Address Translation maps private IP addresses to a public IP address.",
    examples: [],
    answer: "Helps save IPv4 addresses and provides security."
  },
  {
    id: 50,
    title: "What is VPN?",
    topic: "Networking",
    description: "Virtual Private Network encrypts data to provide secure communication over public networks.",
    examples: [],
    answer: "Used for secure remote access."
  },
  {
    id: 51,
    title: "Explain Subnet Mask",
    topic: "Networking",
    description: "A subnet mask separates the network and host portions of an IP address.",
    examples: [],
    answer: "Helps route packets efficiently within subnetworks."
  },
  {
    id: 52,
    title: "What is VLAN?",
    topic: "Networking",
    description: "Virtual LAN segments a network logically, regardless of physical location.",
    examples: [],
    answer: "Improves security and reduces broadcast traffic."
  },
  {
    id: 53,
    title: "Explain Routing",
    topic: "Networking",
    description: "Routing determines the path for data packets to reach their destination.",
    examples: [],
    answer: "Can be static or dynamic (using routing protocols like RIP, OSPF)."
  },
  {
    id: 54,
    title: "What is DNS Spoofing?",
    topic: "Networking",
    description: "DNS spoofing is an attack where false DNS responses redirect traffic to malicious sites.",
    examples: [],
    answer: "Prevention: DNSSEC, secure DNS servers."
  },
  {
    id: 55,
    title: "Explain ICMP",
    topic: "Networking",
    description: "Internet Control Message Protocol is used for error reporting and diagnostics.",
    examples: [],
    answer: "Used by tools like ping and traceroute."
  },
  {
    id: 56,
    title: "What is HTTP/2?",
    topic: "Networking",
    description: "HTTP/2 is an updated version of HTTP supporting multiplexing and header compression.",
    examples: [],
    answer: "Improves performance of web communication."
  },
  {
    id: 57,
    title: "Explain SMTP",
    topic: "Networking",
    description: "Simple Mail Transfer Protocol is used to send emails.",
    examples: [],
    answer: "Works with POP/IMAP for email delivery and retrieval."
  },
  {
    id: 58,
    title: "What is DHCP?",
    topic: "Networking",
    description: "Dynamic Host Configuration Protocol automatically assigns IP addresses to devices.",
    examples: [],
    answer: "Reduces manual IP configuration."
  },
  {
    id: 59,
    title: "Explain Ping",
    topic: "Networking",
    description: "Ping checks the reachability of a host on a network using ICMP.",
    examples: ["ping 192.168.0.1"],
    answer: "Measures round-trip time for packets."
  },
  {
    id: 60,
    title: "Explain Network Topologies",
    topic: "Networking",
    description: "Network topology is the layout of devices in a network.",
    examples: [],
    answer: "Types: Star, Bus, Ring, Mesh, Hybrid."
  },
  {
    id: 61,
    title: "What is Bandwidth vs Throughput?",
    topic: "Networking",
    description: "Bandwidth is the max capacity; throughput is actual data transferred.",
    examples: [],
    answer: "Throughput ≤ Bandwidth due to network overheads."
  },
  {
    id: 62,
    title: "Explain Proxy Server",
    topic: "Networking",
    description: "A proxy server acts as an intermediary between client and server.",
    examples: [],
    answer: "Used for security, caching, and content filtering."
  },
  {
    id: 63,
    title: "What is SNMP?",
    topic: "Networking",
    description: "Simple Network Management Protocol is used for monitoring and managing devices on a network.",
    examples: [],
    answer: "Helps network administrators manage devices centrally."
  },
  {
    id: 64,
    title: "Explain IPv4 vs IPv6",
    topic: "Networking",
    description: "IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses.",
    examples: [],
    answer: "IPv6 provides a larger address space and improved routing."
  },
  {
    id: 65,
    title: "What is a MAC Address?",
    topic: "Networking",
    description: "MAC address is a unique identifier assigned to network interfaces.",
    examples: [],
    answer: "Used for communication within a local network."
  },

  {
    id: 66,
    title: "What are Classes and Objects?",
    topic: "OOP",
    description: "A class is a blueprint for objects; an object is an instance of a class.",
    examples: ["Class: Car {color, model}; Object: Car c1 = new Car()"],
    answer: "Classes define properties and methods; objects hold actual data."
  },
  {
    id: 67,
    title: "Explain Constructor",
    topic: "OOP",
    description: "A constructor is a special method called when an object is created.",
    examples: ["class Car { Car() { } }"],
    answer: "Used to initialize object properties."
  },
  {
    id: 68,
    title: "Explain Method Overloading",
    topic: "OOP",
    description: "Multiple methods with the same name but different parameters in a class.",
    examples: ["void add(int a, int b); void add(double a, double b);"],
    answer: "Example of compile-time (static) polymorphism."
  },
  {
    id: 69,
    title: "Explain Method Overriding",
    topic: "OOP",
    description: "A subclass provides a new implementation of a method in its superclass.",
    examples: ["class A { void show() {} } class B extends A { void show() {} }"],
    answer: "Example of runtime (dynamic) polymorphism."
  },
  {
    id: 70,
    title: "What is Interface?",
    topic: "OOP",
    description: "Interface defines a contract of methods a class must implement.",
    examples: ["interface Drawable { void draw(); }"],
    answer: "Supports abstraction and multiple inheritance."
  },
  {
    id: 71,
    title: "What is Abstract Class?",
    topic: "OOP",
    description: "Abstract class cannot be instantiated and may have abstract methods.",
    examples: ["abstract class Shape { abstract void draw(); }"],
    answer: "Provides base functionality to subclasses."
  },
  {
    id: 72,
    title: "Explain Aggregation",
    topic: "OOP",
    description: "Aggregation is a 'has-a' relationship where the child can exist independently of the parent.",
    examples: ["class Library { Book book; }"],
    answer: "Library and Book can exist separately."
  },
  {
    id: 73,
    title: "Explain Composition",
    topic: "OOP",
    description: "Composition is a 'has-a' relationship where the child cannot exist without the parent.",
    examples: ["class House { Room room; }"],
    answer: "If House is destroyed, Room is destroyed."
  },
  {
    id: 74,
    title: "What is Association?",
    topic: "OOP",
    description: "Association is a general binary relationship between two classes.",
    examples: ["Teacher and Student can interact without ownership."],
    answer: "Shows how objects of one class relate to objects of another."
  },
  {
    id: 75,
    title: "Explain Encapsulation with Example",
    topic: "OOP",
    description: "Encapsulation hides internal data using access specifiers.",
    examples: ["private int age; public int getAge() { return age; }"],
    answer: "Protects data from unauthorized access."
  },
  {
    id: 76,
    title: "Explain Abstraction with Example",
    topic: "OOP",
    description: "Abstraction hides implementation details and shows only functionality.",
    examples: ["abstract class Vehicle { abstract void move(); }"],
    answer: "User interacts with methods without knowing internal code."
  },
  {
    id: 77,
    title: "What is Multiple Inheritance?",
    topic: "OOP",
    description: "A class inherits from more than one class.",
    examples: [],
    answer: "In Java, achieved using interfaces to avoid diamond problem."
  },
  {
    id: 78,
    title: "What is Single Inheritance?",
    topic: "OOP",
    description: "A class inherits from only one superclass.",
    examples: ["class B extends A {}"],
    answer: "Simple and avoids ambiguity."
  },
  {
    id: 79,
    title: "What is Multilevel Inheritance?",
    topic: "OOP",
    description: "A class inherits from a subclass which is itself derived from another class.",
    examples: ["class C extends B extends A {}"],
    answer: "Forms an inheritance chain."
  },
  {
    id: 80,
    title: "What is Hierarchical Inheritance?",
    topic: "OOP",
    description: "Multiple classes inherit from a single parent class.",
    examples: ["class B extends A {}; class C extends A {};"],
    answer: "Used to share common functionality."
  },
  {
    id: 81,
    title: "Explain Object Casting",
    topic: "OOP",
    description: "Converting one object type to another.",
    examples: ["Upcasting: Parent p = new Child(); Downcasting: Child c = (Child)p;"],
    answer: "Used to access subclass methods via parent reference."
  },
  {
    id: 82,
    title: "What is Static vs Instance Members?",
    topic: "OOP",
    description: "Static members belong to class; instance members belong to object.",
    examples: ["static int count; int age;"],
    answer: "Static variables are shared across all objects."
  },
  {
    id: 83,
    title: "Explain Final Keyword in OOP",
    topic: "OOP",
    description: "Final can be used with class, method, or variable to restrict modification.",
    examples: ["final class A {}; final void show() {}; final int x = 5;"],
    answer: "Prevents inheritance, overriding, or reassignment."
  },
  {
    id: 84,
    title: "Explain 'this' Keyword",
    topic: "OOP",
    description: "'this' refers to the current object instance.",
    examples: ["this.age = age;"],
    answer: "Used to avoid naming conflicts and pass current object."
  },
  {
    id: 85,
    title: "Explain 'super' Keyword",
    topic: "OOP",
    description: "'super' refers to the parent class instance.",
    examples: ["super.methodName(); super.variable;"],
    answer: "Used to access parent class methods and variables."
  },
  {
    id: 86,
    title: "What is a Candidate Key?",
    topic: "DBMS",
    description: "A candidate key is a minimal set of attributes that can uniquely identify a tuple in a table.",
    examples: [],
    answer: "One table can have multiple candidate keys."
  },
  {
    id: 87,
    title: "What is a Super Key?",
    topic: "DBMS",
    description: "A super key is a set of one or more attributes that can uniquely identify a tuple.",
    examples: [],
    answer: "Super key may contain extra attributes beyond what is needed to uniquely identify tuples."
  },
  {
    id: 88,
    title: "Explain Referential Integrity",
    topic: "DBMS",
    description: "Referential integrity ensures that foreign keys correctly reference primary keys in another table.",
    examples: [],
    answer: "Prevents orphan records and maintains consistency."
  },
  {
    id: 89,
    title: "Explain 1NF (First Normal Form)",
    topic: "DBMS",
    description: "1NF requires that all table attributes have atomic (indivisible) values.",
    examples: [],
    answer: "Eliminates repeating groups and ensures each column has single values."
  },
  {
    id: 90,
    title: "Explain 2NF (Second Normal Form)",
    topic: "DBMS",
    description: "2NF requires that the table is in 1NF and all non-key attributes are fully functionally dependent on the primary key.",
    examples: [],
    answer: "Removes partial dependency on composite keys."
  },
  {
    id: 91,
    title: "Explain 3NF (Third Normal Form)",
    topic: "DBMS",
    description: "3NF requires the table to be in 2NF and no transitive dependency exists for non-key attributes.",
    examples: [],
    answer: "Eliminates indirect dependencies and reduces redundancy."
  },
  {
    id: 92,
    title: "Explain BCNF (Boyce-Codd Normal Form)",
    topic: "DBMS",
    description: "BCNF is a stricter version of 3NF where every determinant is a candidate key.",
    examples: [],
    answer: "Eliminates anomalies that 3NF might not resolve."
  },
  {
    id: 93,
    title: "What is a Transaction?",
    topic: "DBMS",
    description: "A transaction is a sequence of operations performed as a single logical unit of work.",
    examples: [],
    answer: "Transactions follow ACID properties to maintain database consistency."
  },
  {
    id: 94,
    title: "What is Concurrency Control?",
    topic: "DBMS",
    description: "Concurrency control ensures correct execution of simultaneous transactions.",
    examples: [],
    answer: "Methods: Locking, Timestamping, Optimistic Concurrency Control."
  },
  {
    id: 95,
    title: "Explain Deadlock in DBMS",
    topic: "DBMS",
    description: "Deadlock occurs when two or more transactions wait indefinitely for resources held by each other.",
    examples: [],
    answer: "Handled using prevention, detection, and recovery techniques."
  },
  {
    id: 96,
    title: "Explain Indexing",
    topic: "DBMS",
    description: "Indexing improves query performance by providing quick access to rows.",
    examples: [],
    answer: "Types: Single-level, Multi-level, B-tree, Hash index."
  },
  {
    id: 97,
    title: "What is Denormalization?",
    topic: "DBMS",
    description: "Denormalization combines tables to improve query performance at the cost of redundancy.",
    examples: [],
    answer: "Used when read performance is more important than storage optimization."
  },
  {
    id: 98,
    title: "Difference between Primary Key and Unique Key",
    topic: "DBMS",
    description: "Both enforce uniqueness, but primary key cannot be NULL while unique key can be.",
    examples: [],
    answer: "Each table can have only one primary key but multiple unique keys."
  },
  {
    id: 99,
    title: "Explain SQL Join",
    topic: "DBMS",
    description: "Joins combine rows from two or more tables based on related columns.",
    examples: ["INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN"],
    answer: "Used to fetch related data efficiently."
  },
  {
    id: 100,
    title: "Explain View in DBMS",
    topic: "DBMS",
    description: "A view is a virtual table based on the result of a query.",
    examples: [],
    answer: "Simplifies queries and provides security by restricting columns."
  },
  {
    id: 101,
    title: "What is Stored Procedure?",
    topic: "DBMS",
    description: "A stored procedure is a set of SQL statements stored in the database.",
    examples: [],
    answer: "Improves performance and code reuse."
  },
  {
    id: 102,
    title: "Explain Trigger",
    topic: "DBMS",
    description: "A trigger is a database object that automatically executes in response to certain events.",
    examples: [],
    answer: "Used for auditing, enforcing constraints, or derived column updates."
  },
  {
    id: 103,
    title: "Explain Deadlock Prevention in DBMS",
    topic: "DBMS",
    description: "Techniques to prevent deadlock before it occurs.",
    examples: [],
    answer: "Methods: Wait-die, Wound-wait, resource ordering."
  },
  {
    id: 104,
    title: "Explain Rollback and Commit",
    topic: "DBMS",
    description: "Rollback undoes a transaction; Commit makes a transaction permanent.",
    examples: [],
    answer: "Used to maintain consistency in transactional databases."
  },
  {
    id: 105,
    title: "Difference between SQL and PL/SQL",
    topic: "DBMS",
    description: "SQL is a query language for data manipulation; PL/SQL is procedural language extension of SQL.",
    examples: [],
    answer: "PL/SQL allows loops, conditions, and procedural logic."
  },

  // You can continue adding up to 50+ questions in the same format
];

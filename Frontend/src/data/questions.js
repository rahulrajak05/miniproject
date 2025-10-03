// src/data/questions.js
// src/data/questions.js
export const questions = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
  },
  {
    id: 2,
    title: "Reverse a String",
    difficulty: "Easy",
    description: "Write a function that reverses a string.",
    examples: [
      { input: "s = 'hello'", output: "'olleh'" },
    ],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      { input: "s = 'abcabcbb'", output: "3" },
    ],
  },
  {
    id: 4,
    title: "Add Two Numbers (Linked List)",
    difficulty: "Medium",
    description:
      "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return it as a linked list.",
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" },
    ],
  },
  {
    id: 5,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description:
      "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: "s = '()[]{}'", output: "true" },
      { input: "s = '(]'", output: "false" },
    ],
  },
  {
    id: 6,
    title: "Merge Intervals",
    difficulty: "Medium",
    description:
      "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
    ],
  },
  {
    id: 7,
    title: "Maximum Subarray",
    difficulty: "Easy",
    description:
      "Given an integer array nums, find the contiguous subarray with the largest sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
    ],
  },
  {
    id: 8,
    title: "LRU Cache",
    difficulty: "Hard",
    description:
      "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    examples: [],
  },
  {
    id: 9,
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    description:
      "The median is the middle value in an ordered integer list. If the size is even, the median is the average of the two middle numbers.",
    examples: [
      { input: "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()", output: "[1.5,2]" },
    ],
  },
  {
    id: 10,
    title: "Container With Most Water",
    difficulty: "Medium",
    description:
      "Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai), find two lines, which together with x-axis forms a container, such that the container contains the most water.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
    ],
  },

  {
  id: 11,
  title: "Climbing Stairs",
  difficulty: "Easy",
  description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  examples: [
    { input: "n = 2", output: "2" },
    { input: "n = 3", output: "3" },
  ],
},
{
  id: 12,
  title: "Search in Rotated Sorted Array",
  difficulty: "Medium",
  description: "Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand. Search for a given target and return its index.",
  examples: [
    { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
  ],
},
{
  id: 13,
  title: "Coin Change",
  difficulty: "Medium",
  description: "You are given coins of different denominations and a total amount. Return the fewest number of coins needed to make up that amount.",
  examples: [
    { input: "coins = [1,2,5], amount = 11", output: "3" },
  ],
},
{
  id: 14,
  title: "Trapping Rain Water",
  difficulty: "Hard",
  description: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
  examples: [
    { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
  ],
},
{
  id: 15,
  title: "Word Break",
  difficulty: "Medium",
  description: "Given a string s and a dictionary of words, determine if s can be segmented into a space-separated sequence of dictionary words.",
  examples: [
    { input: "s = 'leetcode', wordDict = ['leet','code']", output: "true" },
  ],
},
{
  id: 16,
  title: "Rotate Image",
  difficulty: "Medium",
  description: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees clockwise.",
  examples: [
    { input: "[[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
  ],
},
{
  id: 17,
  title: "Maximum Product Subarray",
  difficulty: "Medium",
  description: "Find the contiguous subarray within an array (containing at least one number) which has the largest product.",
  examples: [
    { input: "nums = [2,3,-2,4]", output: "6" },
  ],
},
{
  id: 18,
  title: "Palindrome Linked List",
  difficulty: "Easy",
  description: "Given a singly linked list, determine if it is a palindrome.",
  examples: [
    { input: "1->2->2->1", output: "true" },
  ],
},
{
  id: 19,
  title: "Word Ladder",
  difficulty: "Hard",
  description: "Given two words (beginWord and endWord), and a dictionary, find the length of the shortest transformation sequence from beginWord to endWord.",
  examples: [
    { input: "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']", output: "5" },
  ],
},
{
  id: 20,
  title: "Search a 2D Matrix",
  difficulty: "Medium",
  description: "Write an efficient algorithm that searches for a value in an m x n matrix.",
  examples: [
    { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
  ],
},

  {
    id: 21,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    examples: [
      { input: "root = [1,null,2,3]", output: "[1,3,2]" },
    ],
  },
  {
    id: 22,
    title: "Minimum Path Sum",
    difficulty: "Medium",
    description: "Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers.",
    examples: [
      { input: "grid = [[1,3,1],[1,5,1],[4,2,1]]", output: "7" },
    ],
  },
  {
    id: 23,
    title: "Binary Search",
    difficulty: "Easy",
    description: "Implement binary search on a sorted array. Return the index of the target element or -1 if not found.",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
    ],
  },
  {
    id: 24,
    title: "House Robber",
    difficulty: "Medium",
    description: "You are a professional robber planning to rob houses along a street. Return the maximum amount you can rob without alerting the police.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "4" },
    ],
  },
  {
    id: 25,
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    description: "Find the kth largest element in an unsorted array.",
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
    ],
  },
  {
    id: 26,
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    description: "Implement a trie with insert, search, and startsWith methods.",
    examples: [
      { input: "insert('apple'), search('apple'), search('app'), startsWith('app'), insert('app'), search('app')", output: "[true,false,true,true]" },
    ],
  },
  {
    id: 27,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    description: "Given a string s, return the longest palindromic substring.",
    examples: [
      { input: "s = 'babad'", output: "'bab' or 'aba'" },
    ],
  },
  {
    id: 28,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    description: "Given two strings s and t, return the minimum window substring of s that contains all the characters in t.",
    examples: [
      { input: "s = 'ADOBECODEBANC', t = 'ABC'", output: "'BANC'" },
    ],
  },
  {
    id: 29,
    title: "Unique Paths",
    difficulty: "Medium",
    description: "There is a robot on an m x n grid. Return the number of unique paths to reach bottom-right from top-left.",
    examples: [
      { input: "m = 3, n = 7", output: "28" },
    ],
  },
  {
    id: 30,
    title: "Subsets",
    difficulty: "Medium",
    description: "Given an integer array nums, return all possible subsets (the power set).",
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]" },
    ],
  },

  {
    id: 31,
    title: "Permutations",
    difficulty: "Medium",
    description: "Given an array nums of distinct integers, return all possible permutations.",
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
    ],
  },
  {
    id: 32,
    title: "N-Queens",
    difficulty: "Hard",
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.",
    examples: [
      { input: "n = 4", output: "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]" },
    ],
  },
  {
    id: 33,
    title: "Sudoku Solver",
    difficulty: "Hard",
    description: "Write a program to solve a Sudoku puzzle by filling empty cells.",
    examples: [
      { input: "board with '.' as empty", output: "Solved board" },
    ],
  },
  {
    id: 34,
    title: "Valid Sudoku",
    difficulty: "Medium",
    description: "Determine if a 9x9 Sudoku board is valid.",
    examples: [
      { input: "board = [...]", output: "true/false" },
    ],
  },
  {
    id: 35,
    title: "Jump Game",
    difficulty: "Medium",
    description: "Given an array of non-negative integers, determine if you can reach the last index.",
    examples: [
      { input: "nums = [2,3,1,1,4]", output: "true" },
      { input: "nums = [3,2,1,0,4]", output: "false" },
    ],
  },
  {
    id: 36,
    title: "Find Peak Element",
    difficulty: "Medium",
    description: "A peak element is an element that is strictly greater than its neighbors. Return the index of any peak element.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "2" },
    ],
  },
  {
    id: 37,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    description: "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" },
    ],
  },
  {
    id: 38,
    title: "Pow(x, n)",
    difficulty: "Medium",
    description: "Implement pow(x, n), which calculates x raised to the power n.",
    examples: [
      { input: "x = 2.0, n = 10", output: "1024.0" },
    ],
  },
  {
    id: 39,
    title: "Spiral Matrix",
    difficulty: "Medium",
    description: "Given an m x n matrix, return all elements of the matrix in spiral order.",
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
    ],
  },
  {
    id: 40,
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    description: "Given an m x n matrix, if an element is 0, set its entire row and column to 0.",
    examples: [
      { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" },
    ],
  },

  {
    id: 41,
    title: "Valid Anagram",
    difficulty: "Easy",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    examples: [
      { input: "s = 'anagram', t = 'nagaram'", output: "true" },
      { input: "s = 'rat', t = 'car'", output: "false" },
    ],
  },
  {
    id: 42,
    title: "Group Anagrams",
    difficulty: "Medium",
    description: "Given an array of strings, group the anagrams together.",
    examples: [
      { input: "strs = ['eat','tea','tan','ate','nat','bat']", output: "[['eat','tea','ate'],['tan','nat'],['bat']]" },
    ],
  },
  {
    id: 43,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    description: "Return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i].",
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
    ],
  },
  {
    id: 44,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    description: "Given the root of a binary tree, return its maximum depth.",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
    ],
  },
  {
    id: 45,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    description: "Invert a binary tree.",
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
    ],
  },
  {
    id: 46,
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    description: "Design an algorithm to serialize and deserialize a binary tree.",
    examples: [
      { input: "root = [1,2,3,null,null,4,5]", output: "Serialized string and deserialized tree" },
    ],
  },
  {
    id: 47,
    title: "Number of Islands",
    difficulty: "Medium",
    description: "Given an m x n 2D binary grid, return the number of islands.",
    examples: [
      { input: "grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]", output: "1" },
    ],
  },
  {
    id: 48,
    title: "Course Schedule",
    difficulty: "Medium",
    description: "There are a total of numCourses you have to take, labeled from 0 to numCourses-1. Return true if you can finish all courses given the prerequisites.",
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
    ],
  },
  {
    id: 49,
    title: "Alien Dictionary",
    difficulty: "Hard",
    description: "Given a sorted dictionary of an alien language, find the order of characters in the language.",
    examples: [
      { input: "words = ['wrt','wrf','er','ett','rftt']", output: "'wertf'" },
    ],
  },
  {
    id: 50,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    description: "You are given an array of k linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list.",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
    ],
  },
];



  // ...continue adding until 50+ with proper questions, difficulty, descriptions, and examples

// Example: auto-generate more questions for demo purposes
// for (let i = 1; i <= 60; i++) {
//   questions.push({
//     id: i,
//     title: `Sample Question ${i}`,
//     difficulty: i % 3 === 0 ? "Hard" : i % 3 === 1 ? "Easy" : "Medium",
//     description: `This is the description of Sample Question ${i}.`,
//     examples: [{ input: `Input for question ${i}`, output: `Output for question ${i}` }],
//   });
// }

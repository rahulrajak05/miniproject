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

  // ...continue adding until 50+ with proper questions, difficulty, descriptions, and examples
];

// Example: auto-generate more questions for demo purposes
// for (let i = 5; i <= 60; i++) {
//   questions.push({
//     id: i,
//     title: `Sample Question ${i}`,
//     difficulty: i % 3 === 0 ? "Hard" : i % 3 === 1 ? "Easy" : "Medium",
//     description: `This is the description of Sample Question ${i}.`,
//     examples: [{ input: `Input for question ${i}`, output: `Output for question ${i}` }],
//   });
// }

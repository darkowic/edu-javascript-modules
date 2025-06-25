// CommonJS-style imports using require
const { formatDate, HashGenerator } = require("dual-package");
const axios = require("axios");

type RawAxiosRequestHeaders = typeof axios.RawAxiosRequestHeaders;

// Type definition example
type DataStructure = {
  name: string;
  timestamp: string;
  headers: RawAxiosRequestHeaders
};

// Creating data with TypeScript type checking
const data = {
  name: "CommonJS Consumer Example",
  timestamp: formatDate(new Date()),
  headers: {},
} satisfies DataStructure;

// Using named import from require
console.log("Current date formatted:", formatDate(new Date()));

// Using exported class
const hasher = new HashGenerator();
console.log("Hash of 'test':", hasher.generate("test"));

// Using the data
console.log("Sample data:", data);

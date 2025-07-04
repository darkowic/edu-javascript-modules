// ESM-style import
import { formatDate, HashGenerator } from "dual-package";
import type { RawAxiosRequestHeaders } from "axios"

// Type definition example
type DataStructure = {
  name: string;
  timestamp: string;
  headers: RawAxiosRequestHeaders
};

// Creating data with TypeScript type checking
const data = {
  name: "ESM Consumer Example",
  timestamp: formatDate(new Date()),
  headers: {}
} satisfies DataStructure;

// Using named import
console.log("Current date formatted:", formatDate(new Date()));

// Using default export (available as named export in dual-package)
const hasher = new HashGenerator();
console.log("Hash of 'test':", hasher.generate("test"));

// Using the data
console.log("Sample data:", data);

// ESM-style import
import { formatDate, HashGenerator } from "dual-package";

// Type definition example
type DataStructure = {
  name: string;
  timestamp: string;
};

// Creating data with TypeScript type checking
const data = {
  name: "ESM Consumer Example",
  timestamp: formatDate(new Date())
} satisfies DataStructure;

// Using named import
console.log("Current date formatted:", formatDate(new Date()));

// Using default export (available as named export in dual-package)
const hasher = new HashGenerator();
console.log("Hash of 'test':", hasher.generate("test"));

// Using the data
console.log("Sample data:", data);

import { LevelQuestions, LevelTopics } from "@/types";

export const Languages = ["JavaScript", "TypeScript"];
export const Levels = ["Beginner", "Intermediate", "Advanced"];
export const QuizCounts = [10, 20, 30];

export const BaseQuestions: { [language: string]: LevelQuestions } = {
  javascript: {
    beginner: [
      {
        id: "js-b-1",
        question: "What is the syntax for declaring a variable in JavaScript?",
        options: ["var x = 5", "let x = 5", "const x = 5", "all of the above"],
        correctAnswer: "all of the above",
        topic: "Variables",
      },
      {
        id: "js-b-2",
        question: "What is the purpose of the console.log() function in JavaScript?",
        options: ["To display errors", "To display warnings", "To print output to the console", "To execute code"],
        correctAnswer: "To print output to the console",
        topic: "Console",
      },
      {
        id: "js-b-3",
        question: "What is the difference between null and undefined in JavaScript?",
        options: [
          "null is a number, undefined is a string",
          "null is an object, undefined is a primitive value",
          "null is an intentionally empty value, undefined means a value hasn't been assigned",
          "all of the above",
        ],
        correctAnswer: "null is an intentionally empty value, undefined means a value hasn't been assigned",
        topic: "Data Types",
      },
      {
        id: "js-b-4",
        question: "What is the syntax for creating an array in JavaScript?",
        options: ["var arr = []", "var arr = new Array()", "both of the above", "neither of the above"],
        correctAnswer: "both of the above",
        topic: "Arrays",
      },
      {
        id: "js-b-5",
        question: "What is the purpose of the if statement in JavaScript?",
        options: [
          "To execute code repeatedly",
          "To skip code execution",
          "To execute code conditionally",
          "To declare variables",
        ],
        correctAnswer: "To execute code conditionally",
        topic: "Control Flow",
      },
    ],
    intermediate: [
      {
        id: "js-i-1",
        question: "What is the difference between == and === in JavaScript?",
        options: [
          "== checks for value equality, === checks for type equality",
          "== performs type coercion before comparison, === checks value and type without coercion",
          "== checks for type equality, === checks for value equality",
          "== checks for both value and type equality",
        ],
        correctAnswer: "== performs type coercion before comparison, === checks value and type without coercion",
        topic: "Operators",
      },
      {
        id: "js-i-2",
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        options: [
          "To refer to the global object",
          "To refer to the current function",
          "To refer to the current object",
          "To declare variables",
        ],
        correctAnswer: "To refer to the current object",
        topic: "Functions",
      },
      {
        id: "js-i-3",
        question: "What is the difference between let and const in JavaScript?",
        options: [
          "let is used for constants, const is used for variables",
          "let is used for variables, const is used for constants",
          "let and const are interchangeable",
          "none of the above",
        ],
        correctAnswer: "let is used for variables, const is used for constants",
        topic: "Variables",
      },
      {
        id: "js-i-4",
        question: "What is the purpose of the map() function in JavaScript?",
        options: [
          "To create a new array with transformed values",
          "To filter out values from an array",
          "To sort an array",
          "To reverse an array",
        ],
        correctAnswer: "To create a new array with transformed values",
        topic: "Arrays",
      },
      {
        id: "js-i-5",
        question: "What is the difference between async/await and promises in JavaScript?",
        options: [
          "async/await is used for synchronous code, promises are used for asynchronous code",
          "async/await is used for asynchronous code, promises are used for synchronous code",
          "async/await provides a more synchronous-looking syntax for handling promises",
          "async/await and promises are interchangeable",
        ],
        correctAnswer: "async/await provides a more synchronous-looking syntax for handling promises",
        topic: "Asynchronous Programming",
      },
    ],
    advanced: [
      {
        id: "js-a-1",
        question: "What is the purpose of the Proxy object in JavaScript?",
        options: [
          "To create a new object with the same properties as an existing object",
          "To intercept and modify property access on an object",
          "To create a new function with the same behavior as an existing function",
          "To optimize code execution",
        ],
        correctAnswer: "To intercept and modify property access on an object",
        topic: "Meta Programming",
      },
      {
        id: "js-a-2",
        question: "What is the difference between WeakMap and Map in JavaScript?",
        options: [
          "WeakMap is used for caching, Map is used for data storage",
          "WeakMap is used for data storage, Map is used for caching",
          "WeakMap only accepts objects as keys and allows them to be garbage collected, Map accepts any type as keys",
          "none of the above",
        ],
        correctAnswer:
          "WeakMap only accepts objects as keys and allows them to be garbage collected, Map accepts any type as keys",
        topic: "Data Structures",
      },
      {
        id: "js-a-3",
        question: "What is the purpose of the Symbol type in JavaScript?",
        options: [
          "To create unique property names",
          "To create unique function names",
          "To create unique variable names",
          "To optimize code execution",
        ],
        correctAnswer: "To create unique property names",
        topic: "Data Types",
      },
      {
        id: "js-a-4",
        question: "What is the difference between Object.create() and Object.assign() in JavaScript?",
        options: [
          "Object.create() creates a new object with the same properties as an existing object, Object.assign() copies properties from one object to another",
          "Object.create() copies properties from one object to another, Object.assign() creates a new object with the same properties as an existing object",
          "Object.create() is used for inheritance, Object.assign() is used for composition",
          "none of the above",
        ],
        correctAnswer:
          "Object.create() creates a new object with the same properties as an existing object, Object.assign() copies properties from one object to another",
        topic: "Object Manipulation",
      },
      {
        id: "js-a-5",
        question: "What is the purpose of the Reflect API in JavaScript?",
        options: [
          "To provide a way to inspect and manipulate objects at runtime",
          "To provide a way to optimize code execution",
          "To provide a way to create new objects with the same properties as existing objects",
          "To provide a way to copy properties from one object to another",
        ],
        correctAnswer: "To provide a way to inspect and manipulate objects at runtime",
        topic: "Meta Programming",
      },
    ],
  },
  typescript: {
    beginner: [
      {
        id: "ts-b-1",
        question: "What is the main purpose of TypeScript?",
        options: [
          "To add static typing to JavaScript",
          "To provide a new syntax for JavaScript",
          "To optimize JavaScript code",
          "To create a new programming language",
        ],
        correctAnswer: "To add static typing to JavaScript",
        topic: "Introduction",
      },
      {
        id: "ts-b-2",
        question: "What is the difference between let and const in TypeScript?",
        options: [
          "let is used for constants, const is used for variables",
          "let is used for variables, const is used for constants",
          "let and const are interchangeable",
          "none of the above",
        ],
        correctAnswer: "let is used for variables, const is used for constants",
        topic: "Variables",
      },
      {
        id: "ts-b-3",
        question: "What is the purpose of the interface keyword in TypeScript?",
        options: [
          "To define a new class",
          "To define a new function",
          "To define a new type",
          "To define a new variable",
        ],
        correctAnswer: "To define a new type",
        topic: "Interfaces",
      },
      {
        id: "ts-b-4",
        question: "What is the difference between type and interface in TypeScript?",
        options: [
          "interfaces can be merged and are more extensible, types can unite/intersect and represent any kind of type",
          "type is used for object types, interface is used for primitive types",
          "type and interface are interchangeable",
          "none of the above",
        ],
        correctAnswer:
          "interfaces can be merged and are more extensible, types can unite/intersect and represent any kind of type",
        topic: "Types",
      },
      {
        id: "ts-b-5",
        question: "What is the purpose of the any type in TypeScript?",
        options: [
          "To bypass type checking",
          "To define a new type",
          "To create a new variable",
          "To optimize code execution",
        ],
        correctAnswer: "To bypass type checking",
        topic: "Types",
      },
    ],
    intermediate: [
      {
        id: "ts-i-1",
        question: "What is the purpose of the extends keyword in TypeScript?",
        options: [
          "To inherit from a parent class or to constrain generic types",
          "To implement an interface",
          "To extend a type",
          "To create a new class",
        ],
        correctAnswer: "To inherit from a parent class or to constrain generic types",
        topic: "Classes",
      },
      {
        id: "ts-i-2",
        question: "What is the difference between public and private access modifiers in TypeScript?",
        options: [
          "public is used for private members, private is used for public members",
          "public is used for public members, private is used for private members",
          "public and private are interchangeable",
          "none of the above",
        ],
        correctAnswer: "public is used for public members, private is used for private members",
        topic: "Classes",
      },
      {
        id: "ts-i-3",
        question: "What is the purpose of the readonly keyword in TypeScript?",
        options: [
          "To make a property read-only",
          "To make a property writable",
          "To create a new property",
          "To optimize code execution",
        ],
        correctAnswer: "To make a property read-only",
        topic: "Classes",
      },
      {
        id: "ts-i-4",
        question: "What is the difference between void and never return types in TypeScript?",
        options: [
          "void is used for functions that return no value, never is used for functions that always throw an error",
          "void is used for functions that always throw an error, never is used for functions that return no value",
          "void and never are interchangeable",
          "none of the above",
        ],
        correctAnswer:
          "void is used for functions that return no value, never is used for functions that always throw an error",
        topic: "Functions",
      },
      {
        id: "ts-i-5",
        question: "What is the purpose of the type guard function in TypeScript?",
        options: [
          "To narrow the type of a value",
          "To widen the type of a value",
          "To create a new type",
          "To optimize code execution",
        ],
        correctAnswer: "To narrow the type of a value",
        topic: "Type Guards",
      },
    ],
    advanced: [
      {
        id: "ts-a-1",
        question: "What is the purpose of the conditional types feature in TypeScript?",
        options: [
          "To create conditional logic in type definitions",
          "To create conditional logic in value definitions",
          "To optimize code execution",
          "To create a new type",
        ],
        correctAnswer: "To create conditional logic in type definitions",
        topic: "Advanced Types",
      },
      {
        id: "ts-a-2",
        question: "What is the difference between infer and extends in TypeScript?",
        options: [
          "infer is used to infer the type of a value, extends is used to extend a type",
          "infer is used to extend a type, extends is used to infer the type of a value",
          "infer and extends are interchangeable",
          "none of the above",
        ],
        correctAnswer: "infer is used to infer the type of a value, extends is used to extend a type",
        topic: "Advanced Types",
      },
      {
        id: "ts-a-3",
        question: "What is the purpose of the mapped types feature in TypeScript?",
        options: [
          "To create a new type by mapping over an existing type",
          "To create a new value by mapping over an existing value",
          "To optimize code execution",
          "To create a new type",
        ],
        correctAnswer: "To create a new type by mapping over an existing type",
        topic: "Advanced Types",
      },
      {
        id: "ts-a-4",
        question: "What is the difference between readonly and as const in TypeScript?",
        options: [
          "readonly is used to make a property read-only, as const is used to make a value a constant",
          "readonly is used to make a value a constant, as const is used to make a property read-only",
          "readonly and as const are interchangeable",
          "none of the above",
        ],
        correctAnswer: "readonly is used to make a property read-only, as const is used to make a value a constant",
        topic: "Advanced Types",
      },
      {
        id: "ts-a-5",
        question: "What is the purpose of the branding feature in TypeScript?",
        options: [
          "To add a brand to a type",
          "To add a brand to a value",
          "To optimize code execution",
          "To create a new type",
        ],
        correctAnswer: "To add a brand to a type",
        topic: "Advanced Types",
      },
    ],
  },
};

export const TopicWeights: { [language: string]: LevelTopics } = {
  javascript: {
    beginner: [
      { topic: "Variables", weight: 0.15 },
      { topic: "DataTypes", weight: 0.15 },
      { topic: "Operators", weight: 0.15 },
      { topic: "ControlFlow", weight: 0.15 },
      { topic: "Functions", weight: 0.15 },
      { topic: "Arrays", weight: 0.15 },
      { topic: "Objects", weight: 0.1 },
    ],
    intermediate: [
      { topic: "Functions", weight: 0.15 },
      { topic: "Objects", weight: 0.15 },
      { topic: "Arrays", weight: 0.15 },
      { topic: "ErrorHandling", weight: 0.1 },
      { topic: "AsyncProgramming", weight: 0.2 },
      { topic: "Modules", weight: 0.1 },
      { topic: "DOM", weight: 0.15 },
    ],
    advanced: [
      { topic: "AsyncProgramming", weight: 0.2 },
      { topic: "DesignPatterns", weight: 0.15 },
      { topic: "Performance", weight: 0.15 },
      { topic: "Security", weight: 0.15 },
      { topic: "Testing", weight: 0.15 },
      { topic: "MetaProgramming", weight: 0.1 },
      { topic: "Memory", weight: 0.1 },
    ],
  },
  typescript: {
    beginner: [
      { topic: "BasicTypes", weight: 0.2 },
      { topic: "Interfaces", weight: 0.2 },
      { topic: "Functions", weight: 0.15 },
      { topic: "Classes", weight: 0.15 },
      { topic: "Enums", weight: 0.15 },
      { topic: "TypeAssertions", weight: 0.15 },
    ],
    intermediate: [
      { topic: "GenericsBasics", weight: 0.2 },
      { topic: "UnionIntersectionTypes", weight: 0.15 },
      { topic: "TypeGuards", weight: 0.15 },
      { topic: "AdvancedInterfaces", weight: 0.15 },
      { topic: "AdvancedClasses", weight: 0.15 },
      { topic: "Decorators", weight: 0.2 },
    ],
    advanced: [
      { topic: "AdvancedGenerics", weight: 0.2 },
      { topic: "ConditionalTypes", weight: 0.15 },
      { topic: "MappedTypes", weight: 0.15 },
      { topic: "UtilityTypes", weight: 0.15 },
      { topic: "TypeInference", weight: 0.15 },
      { topic: "DeclarativePatterns", weight: 0.2 },
    ],
  },
};

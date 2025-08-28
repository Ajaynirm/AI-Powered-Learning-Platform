const questionsData = {
    JavaScript: {
        easy: [
          {
            id: 1,
            question: "What is the output of `typeof null`?",
            options: ["null", "undefined", "object", "number"],
            answer: "object",
          },
          {
            id: 2,
            question: "Which keyword is used to declare a constant variable in JavaScript?",
            options: ["var", "let", "const", "static"],
            answer: "const",
          },
          {   
            id: 3,
            question: "What does `NaN` stand for in JavaScript?",
            options: ["Not a Number", "Null and Negative", "No Argument Needed", "New Array Node"],
            answer: "Not a Number",
          },
          {
            id: 4,
            question: "What is the result of `3 + '3'` in JavaScript?",
            options: ["6", "33", "NaN", "TypeError"],
            answer: "33",
          },
          {
            id: 5,
            question: "Which method is used to add an element to the end of an array?",
            options: ["push()", "pop()", "shift()", "unshift()"],
            answer: "push()",
          },
        ],
        medium: [
          {
            id: 6,
            question: "What will `console.log(2 + '2' - 1)` output?",
            options: ["21", "NaN", "22", "3"],
            answer: "21",
          },
          {
            id: 7,
            question: "What is the difference between `==` and `===` in JavaScript?",
            options: [
              "`==` checks value, `===` checks value and type",
              "They are the same",
              "`===` checks value, `==` checks value and type",
              "`==` is for strings, `===` is for numbers",
            ],
            answer: "`==` checks value, `===` checks value and type",
          },
          {
            id: 8,
            question: "What does the `map()` function do in JavaScript?",
            options: [
              "Removes elements from an array",
              "Applies a function to each element of an array and returns a new array",
              "Filters elements in an array",
              "Sorts an array",
            ],
            answer: "Applies a function to each element of an array and returns a new array",
          },
          {
            id: 9,
            question: "What is a closure in JavaScript?",
            options: [
              "A function that is immediately invoked",
              "A function that has access to variables from its outer scope even after the outer function has finished executing",
              "A function that closes the browser window",
              "A function that returns a boolean value",
            ],
            answer: "A function that has access to variables from its outer scope even after the outer function has finished executing",
          },
          {
            id: 10,
            question: "What is the purpose of the `this` keyword in JavaScript?",
            options: [
              "To refer to the current function",
              "To refer to the global object",
              "To refer to the object that the function is a method of",
              "To refer to the previous function",
            ],
            answer: "To refer to the object that the function is a method of",
          },
        ],
        hard: [
          {
            id: 11,
            question: "What does the `bind` method do in JavaScript?",
            options: [
              "Binds an event to an element",
              "Creates a new function with a fixed `this` value",
              "Executes a function immediately",
              "Changes the prototype of an object",
            ],
            answer: "Creates a new function with a fixed `this` value",
          },
          {
            id: 12,
            question: "Explain the concept of event delegation in JavaScript.",
            options: [
              "Attaching multiple event handlers to a single element",
              "Attaching a single event handler to a parent element to handle events for all its children",
              "Delegating events to the server",
              "Creating custom events",
            ],
            answer: "Attaching a single event handler to a parent element to handle events for all its children",
          },
          {
            id: 13,
            question: "What is the purpose of the `Proxy` object in JavaScript?",
            options: [
              "To create a copy of an object",
              "To intercept and customize operations performed on an object",
              "To create a new prototype",
              "To encrypt an object",
            ],
            answer: "To intercept and customize operations performed on an object",
          },
          {
            id: 14,
            question: "Explain the concept of the event loop in JavaScript.",
            options: [
              "A loop that executes all functions in a synchronous manner",
              "A loop that manages the execution of asynchronous tasks by placing them in a queue",
              "A loop that iterates through all elements in an array",
              "A loop that handles user input",
            ],
            answer: "A loop that manages the execution of asynchronous tasks by placing them in a queue",
          },
          {
            id: 15,
            question: "What is the difference between `async/await` and Promises in JavaScript?",
            options: [
              "Promises are synchronous, `async/await` is asynchronous",
              "`async/await` is syntactic sugar over Promises, making asynchronous code look more synchronous",
              "They are the same",
              "`async/await` is for handling errors, Promises are for handling data",
            ],
            answer: "`async/await` is syntactic sugar over Promises, making asynchronous code look more synchronous",
          },
        ],
      },
      Java: {
        easy: [
          {
            id: 16,
            question: "Which data type is used to store whole numbers in Java?",
            options: ["int", "float", "boolean", "char"],
            answer: "int",
          },
          {
            id: 17,
            question: "What is the keyword used to create an object in Java?",
            options: ["new", "create", "object", "instance"],
            answer: "new",
          },
          {
            id: 18,
            question: "Which access modifier makes a variable accessible only within its class?",
            options: ["private", "public", "protected", "default"],
            answer: "private",
          },
          {
            id: 19,
            question: "What is the extension of a Java source code file?",
            options: [".java", ".class", ".txt", ".js"],
            answer: ".java",
          },
          {
            id: 20,
            question: "What does JVM stand for?",
            options: ["Java Virtual Machine", "Java Visual Machine", "Java Variable Method", "Java Verified Module"],
            answer: "Java Virtual Machine",
          },
        ],
        medium: [
          {
            id: 21,
            question: "What is the difference between `==` and `.equals()` in Java?",
            options: [
              "`==` compares object references, `.equals()` compares object content",
              "They are the same",
              "`==` compares object content, `.equals()` compares object references",
              "`==` is for strings, `.equals()` is for numbers",
            ],
            answer: "`==` compares object references, `.equals()` compares object content",
          },
          {
            id: 22,
            question: "What is inheritance in Java?",
            options: [
              "Creating multiple objects",
              "A mechanism where a new class inherits properties and methods from an existing class",
              "Defining variables",
              "Handling exceptions",
            ],
            answer: "A mechanism where a new class inherits properties and methods from an existing class",
          },
          {
            id: 23,
            question: "What is an interface in Java?",
            options: [
              "A class with only private methods",
              "A blueprint of a class that has static constants and abstract methods",
              "A variable with a constant value",
              "A method that returns an integer",
            ],
            answer: "A blueprint of a class that has static constants and abstract methods",
          } ],
      hard: [],
    },
    Python: {
        easy: [
          {
            id: 1,
            question: "What keyword is used to define a function in Python?",
            options: ["def", "function", "lambda", "define"],
            answer: "def",
          },
          {
            id: 2,
            question: "Which data type is used to store a sequence of characters in Python?",
            options: ["int", "float", "string", "boolean"],
            answer: "string",
          },
          {
            id: 3,
            question: "What is the output of `print(2 + 2)`?",
            options: ["22", "4", "Error", "None"],
            answer: "4",
          },
          {
            id: 4,
            question: "Which symbol is used for single-line comments in Python?",
            options: ["#", "//", "/*", "--"],
            answer: "#",
          },
          {
            id: 5,
            question: "What is the result of `3 * '2'` in Python?",
            options: ["6", "32", "222", "Error"],
            answer: "222",
          },
        ],
        medium: [
          {
            id: 6,
            question: "What is the difference between a list and a tuple in Python?",
            options: [
              "Lists are mutable, tuples are immutable",
              "Tuples are mutable, lists are immutable",
              "Lists use parentheses, tuples use square brackets",
              "They are the same",
            ],
            answer: "Lists are mutable, tuples are immutable",
          },
          {
            id: 7,
            question: "How do you open a file in read mode in Python?",
            options: ["open('file.txt', 'r')", "open('file.txt', 'w')", "open('file.txt', 'a')", "open('file.txt', 'x')"],
            answer: "open('file.txt', 'r')",
          },
          {
            id: 8,
            question: "What does the `__init__` method do in a Python class?",
            options: [
              "Initializes the class",
              "Deletes the class",
              "Prints the class",
              "Returns the class name",
            ],
            answer: "Initializes the class",
          },
          {
            id: 9,
            question: "What is a lambda function in Python?",
            options: [
              "A named function",
              "An anonymous function",
              "A recursive function",
              "A built-in function",
            ],
            answer: "An anonymous function",
          },
          {
            id: 10,
            question: "What is the purpose of the `try...except` block in Python?",
            options: [
              "To define a loop",
              "To handle exceptions",
              "To define a function",
              "To create a class",
            ],
            answer: "To handle exceptions",
          },
        ],
        hard: [
          {
            id: 11,
            question: "Explain the concept of decorators in Python.",
            options: [
              "A way to define classes",
              "A way to modify or extend the behavior of functions or classes",
              "A way to handle files",
              "A way to create loops",
            ],
            answer: "A way to modify or extend the behavior of functions or classes",
          },
          {
            id: 12,
            question: "What is the Global Interpreter Lock (GIL) in Python?",
            options: [
              "A lock that prevents multiple threads from executing Python bytecode at once",
              "A lock that prevents memory leaks",
              "A lock that protects files",
              "A lock that handles exceptions",
            ],
            answer: "A lock that prevents multiple threads from executing Python bytecode at once",
          },
          {
            id: 13,
            question: "Explain the concept of metaclasses in Python.",
            options: [
              "Classes that define how other classes behave",
              "Classes that handle exceptions",
              "Classes that define variables",
              "Classes that handle files",
            ],
            answer: "Classes that define how other classes behave",
          },
          {
            id: 14,
            question: "What is the purpose of the `yield` keyword in Python?",
            options: [
              "To define a loop",
              "To return a value from a function",
              "To create a generator",
              "To define a class",
            ],
            answer: "To create a generator",
          },
          {
            id: 15,
            question: "Explain the concept of asynchronous programming in Python using `asyncio`.",
            options: [
              "A way to write synchronous code",
              "A way to write concurrent code using the `async` and `await` keywords",
              "A way to handle files",
              "A way to create classes",
            ],
            answer: "A way to write concurrent code using the `async` and `await` keywords",
          },
        ],
      },
      React:{
        easy: [
          {
            id: 1,
            question: "What keyword is used to define a function in Python?",
            options: ["def", "function", "lambda", "define"],
            answer: "def",
          },
          {
            id: 2,
            question: "Which data type is used to store a sequence of characters in Python?",
            options: ["int", "float", "string", "boolean"],
            answer: "string",
          },
          {
            id: 3,
            question: "What is the output of `print(2 + 2)`?",
            options: ["22", "4", "Error", "None"],
            answer: "4",
          },
          {
            id: 4,
            question: "Which symbol is used for single-line comments in Python?",
            options: ["#", "//", "/*", "--"],
            answer: "#",
          },
          {
            id: 5,
            question: "What is the result of `3 * '2'` in Python?",
            options: ["6", "32", "222", "Error"],
            answer: "222",
          },
        ],
      },
      TypeScript:{
        easy: [
          {
            id: 1,
            question: "What keyword is used to define a function in Python?",
            options: ["def", "function", "lambda", "define"],
            answer: "def",
          },
          {
            id: 2,
            question: "Which data type is used to store a sequence of characters in Python?",
            options: ["int", "float", "string", "boolean"],
            answer: "string",
          },
          {
            id: 3,
            question: "What is the output of `print(2 + 2)`?",
            options: ["22", "4", "Error", "None"],
            answer: "4",
          },
          {
            id: 4,
            question: "Which symbol is used for single-line comments in Python?",
            options: ["#", "//", "/*", "--"],
            answer: "#",
          },
          {
            id: 5,
            question: "What is the result of `3 * '2'` in Python?",
            options: ["6", "32", "222", "Error"],
            answer: "222",
          },
        ],
      },
  };
  
  export default questionsData;
  
  
const fs = require("fs");
const http = require("http");

////////////////////////////////
// FILE

// Synchronous
// Blocking code execution
{
  /**
    const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `Do you know? \n${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync(`./txt/output.text`, textOut);
console.log(`File written`);
    */
}
// You can register Asynchronous readFile function to read the task and use call back function to get the task back and execute it in Single Thread.
// Non-Blocking Code
// Call back Hell ASynchronous!

{
  /**
    fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./text/${data1}.text`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        if (err) throw err;
        console.log(`Your file have been saved`);
      });
    });
  });
});

     */
}

// Feed back!
{
  /**
    1. Error Handling
    - Using err as the error parameter, but not checking whether err is null or contains an error. This can cause problems if there are any issues reading or writing files.
    - Improvement: Always check for errors in your callback functions and handle them appropriately.
    
    2. File Path Consistency
    - Small inconsistency in the file paths.
    - For example, using ./text/${data1}.text while it should be ./txt/${data1}.txt (assuming the directory is txt).
    - Improvement: Double-check the file paths, especially regarding their extensions and directory names.
    
    3. Callback Hell
    - Showing "callback hell" by nesting the callbacks in demonstration, but it can get really hard to manage as if the code grows.
    - One solution to avoid this is using Promises or async/await.
     */
}

// Call back Hell solution
{
  /**
    const fs = require("fs");

// Callback hell example with improved error handling
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) {
    console.error("Error reading start.txt:", err);
    return; // exit if there is an error
  }

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    if (err) {
      console.error(`Error reading ${data1}.txt:`, err);
      return; // exit if there is an error
    }

    console.log("Data 2:", data2);

    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      if (err) {
        console.error("Error reading append.txt:", err);
        return; // exit if there is an error
      }

      console.log("Data 3:", data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        if (err) {
          console.error("Error writing final.txt:", err);
          return; // exit if there is an error
        }
        console.log("Non-blocking Asynchronous has been built 🚀 ");
      });
    });
  });
});

console.log(
  `Node.js will read data -read-this- in the background. \nSo it will read this line first and then the data below`
);

     */
}

// Refactoring with Promises (for readability)
// Refactoring the code to avoid callback hell, using Promises and async/await will make it much more readable.
{
  /** 

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
    //   console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("Non-blocking Asynchronous has been built 🚀 ");
      });
    });
  });
// });

console.log(
  `Node.js will read data -read-this- in the background. \nSo it will read this line first and then the data below`
);
*/
}

// Suggested solution:
// Refactoring with Promises (for readability)
// Refactoring the code to avoid callback hell.
// using Promises and async/await will make it much more readable.

{
  /**
    const fs = require("fs").promises; // Use fs.promises to work with Promises

async function processFiles() {
  try {
    const data1 = await fs.readFile("./txt/start.txt", "utf-8");
    const data2 = await fs.readFile(`./txt/${data1}.txt`, "utf-8");
    const data3 = await fs.readFile("./txt/append.txt", "utf-8");

    await fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8");

    console.log("Non-blocking Asynchronous has been built 🚀 ");
  } catch (err) {
    console.error("Error occurred:", err);
  }
}

processFiles();

console.log(
  `Node.js will read data -read-this- in the background. \nSo it will read this line first and then the data below`
);

     */
}

// Advantages of the Refactored Version:

// Readability: The code is cleaner and avoids deeply nested callbacks.

// Error Handling: The try-catch block handles errors from all asynchronous operations.

// Async/Await: Using async/await makes it feel like synchronous code, while still being non-blocking.

///////////////////////////////////
// SERVER
const server = http.createServer((req, res) => {
  res.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});

const fs = require("fs");
const http = require("http");
const url = require("url");

// refactor from Async non-blocking to, top-level scope, Sync to avoid re-reading every time when the API gets the call!

const replaceTemplate = (temp, product) => {
  let productOutput = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  productOutput = productOutput.replace(/{%IMAGE%}/g, product.image);
  productOutput = productOutput.replace(/{%FROM%}/g, product.from);
  productOutput = productOutput.replace(/{%NUTRIENTS%}/g, product.nutrients);
  productOutput = productOutput.replace(/{%QUANTITY%}/g, product.quantity);
  productOutput = productOutput.replace(/{%PRICE%}/g, product.price);
  productOutput = productOutput.replace(
    /{%DESCRIPTION%}/g,
    product.description
  );
  productOutput = productOutput.replace(/{%ID%}/g, product.id);

  // check if the product is organic
  if (!product.organic)
    productOutput = productOutput.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return productOutput; // NOTE: Don't forget return the final output
};
// NOTE: Only works better with static data!
// Top-level: read JSON data once when the server starts
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// Read JSON data once when the server starts
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data); // Parse JSON data into JavaScript object
//console.log(productData);
// Open it for debugging purpose

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
// SERVER SETUP
// Creates an HTTP server that listens to incoming requests and responds based on the requested URL path.
// Using Node's built-in 'http' module — no external frameworks (like Express) yet!

const server = http.createServer((req, res) => {
  console.log(`Incoming request🚦: ${req.url}`); // 🎯 pointing the traffic!
  //console.log(req.url); // debugging purpose
  //console.log(url.parse(req.url, true)); // query string parsing by url module and true to parse the query string into an object, product?id={%ID%}
  // req.url gives us the part of the URL after the domain and port.
  // For example, if user visits: http://localhost:8000/overview → req.url === "/overview"

  // ROUTING: Use conditional logic to serve different responses based on URL path
  // Note: This is a basic routing system (manual). Later on, we can automate this with frameworks.

  // Overview page
  // Adding a query and pathname to the URL
  // Destructuring method!
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardsHtml = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join(""); // and join them together into a single string
    //console.log(cardsHtml);
    const productOutput = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);
    // Finally respond to cardsHtml to productOutput
    res.end(productOutput); // Serve the overview page with product cards

    // Product page
  } else if (pathname === "/product") {
    //console.log(query); // Debugging Object { id: '0' }
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = productData[query.id];
    const productOutput = replaceTemplate(tempProduct, product);

    res.end(productOutput);

    // API endpoint
  } else if (pathname === "/api") {
    // __dirname gives the absolute path of the current directory (helps avoid relative path issues)
    // However, it is now moved to op-level scope, Sync to avoid re-reading every time when the API gets the call!
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    // if (err) {
    //  console.log("Error reading API data:", err);
    //  res.writeHead(500, { "Content-Type": "text/plain" });
    //  return res.end("Internal Server Error");
    // Tells the browser it's receiving JSON data

    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(data); // Or `JSON.Stringify(productData)`

    // const productData = JSON.parse(data);
    // console.log(productData);

    // Not Found page
  } else {
    res.writeHead(404, {
      // STATUS CODES:
      // 200 – OK (default if you don't set it)
      // 404 – Not Found → used when no matching route is found

      // HEADERS:
      // "Content-Type" tells the browser what kind of content it’s receiving (text, html, json, etc.)
      // You can also set custom headers like "X-Custom-Header" for debugging or metadata

      "content-type": "text/html",
      "header-name": "hello-world-this-is-my-own-header",
    });
    res.end(
      "<h1>404 Page not found!</h1><p>By setting the content-type as text-html, you can add respond directly in html.</p><p>Inspect the page for all information for status, header-name and Header-content etc;.</p>"
    );
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000 💆‍♀️");
});

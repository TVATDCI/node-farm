// # IMPORTS: Core & Dependencies
import fs from "fs";
import http from "http";
import url from "url";
import slugify from "slugify";
import path from "path";
import { fileURLToPath } from "url";

// # IMPORT: Custom Modules
import replaceTemplate from "./modules/replaceTemplate.js";

// # SETUP: __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// # FILE READ: Templates
export const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
export const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
export const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// # FILE READ: Data
export const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
export const productData = JSON.parse(data);

// # SLUGIFY: Generate Product Slugs
const slugs = productData.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// # FACTORY: Create HTTP Server
// This function is exported so tests can create their own server instance.
// Usage: const server = createServer(productData, { tempOverview, tempCard, tempProduct, data });
// Then: server.listen(0, () => { /* test code */ });
export function createServer(productData, templates) {
  const { tempOverview, tempCard, tempProduct, data } = templates;

  const server = http.createServer((req, res) => {
    // # ROUTE: Extract Query & Path
    const { query, pathname } = url.parse(req.url, true);

    // # ROUTE: Overview Page
    if (pathname === "/" || pathname === "/overview") {
      res.writeHead(200, { "Content-Type": "text/html" });

      const cardsHtml = productData
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      const productOutput = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);

      res.end(productOutput);

      // # ROUTE: Product Page
    } else if (pathname === "/product") {
      // # VALIDATION: Check if id query parameter is present and valid
      // Step 1: Reject missing id
      // Step 2: Reject empty or whitespace-only id
      // Step 3-6: Parse and validate numeric id (must be non-negative integer)
      // Step 7-8: Look up product by id field

      let product = undefined;

      if (query.id !== undefined && query.id !== null && query.id.trim() !== "") {
        const parsedId = Number(query.id);
        if (!Number.isNaN(parsedId) && Number.isInteger(parsedId) && parsedId >= 0) {
          product = productData.find((p) => Number(p.id) === parsedId);
        }
      }

      if (!product) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(
          "<h1>Product not found!</h1><p>We couldn't find a product with that ID. Please check the URL and try again.</p><p><a href='/overview'>← Back to overview</a></p>"
        );
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        const productOutput = replaceTemplate(tempProduct, product);
        res.end(productOutput);
      }

      // # ROUTE: API Endpoint
    } else if (pathname === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);

      // # ROUTE: 404 Not Found
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html",
        "header-name": "hello-world-this-is-my-own-header",
      });
      res.end(
        "<h1>404 Page not found!</h1><p>By setting the content-type as text-html, you can add respond directly in html.</p><p>Inspect the page for all information for status, header-name and Header-content etc;.</p>"
      );
    }
  });

  return server;
}

// # SERVER: Start Listening (only when run directly, not when imported)
// process.argv[1] is the path to the executed script.
// We compare it to import.meta.url so tests can import without starting the server.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = createServer(productData, { tempOverview, tempCard, tempProduct, data });
  server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to request on port 8000 💆‍♀️");
  });
}

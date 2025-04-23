// # IMPORTS: Core & Dependencies
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import url from "url";
import slugify from "slugify";

// # import local modules
import replaceTemplate from "./modules/replaceTemplate.js";

// # Setup __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// # Async init to load templates & data
let tempOverview, tempCard, tempProduct, productData;

const init = async () => {
  try {
    // # Read HTML templates
    tempOverview = await fs.readFile(
      `${__dirname}/templates/template-overview.html`,
      "utf-8"
    );
    tempCard = await fs.readFile(
      `${__dirname}/templates/template-card.html`,
      "utf-8"
    );
    tempProduct = await fs.readFile(
      `${__dirname}/templates/template-product.html`,
      "utf-8"
    );

    // # Read and parse JSON data
    const data = await fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8");
    productData = JSON.parse(data);

    // # Create slugs (optional debug)
    const slugs = productData.map((el) =>
      slugify(el.productName, { lower: true })
    );
    console.log("Slugs:", slugs);
  } catch (err) {
    console.error("Failed to initialize templates or data:", err);
  }
};

// # Start server only after init
init().then(() => {
  const server = http.createServer(async (req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    try {
      // # Overview Page
      if (pathname === "/" || pathname === "/overview") {
        const cardsHtml = productData
          .map((product) => replaceTemplate(tempCard, product))
          .join("");
        const output = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(output);

        // # Product Page
      } else if (pathname === "/product") {
        const product = productData[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(output);

        // # API
      } else if (pathname === "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(productData));

        // #404 Not Found
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page not found</h1>");
      }
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 - Internal Server Error</h1>");
      console.error("Request handling error:", err);
    }
  });

  server.listen(8000, "127.0.0.1", () => {
    console.log("🚀 Server listening on port 8000");
  });
});

// # IMPORTS: Core & Dependencies
const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

// # IMPORT: Custom Modules
const replaceTemplate = require("./modules/replaceTemplate");

// # FILE READ: Templates
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
// # FILE READ: Data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

// # SLUGIFY: Generate Product Slugs
const slugs = productData.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// # SERVER: Create HTTP Server
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
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = productData[query.id];
    const productOutput = replaceTemplate(tempProduct, product);
    res.end(productOutput);

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

// # SERVER: Start Listening
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000 💆‍♀️");
});

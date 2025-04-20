const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");

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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardsHtml = productData
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const productOutput = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);

    res.end(productOutput);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = productData[query.id];
    const productOutput = replaceTemplate(tempProduct, product);
    res.end(productOutput);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
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

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000 💆‍♀️");
});

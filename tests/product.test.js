// # TESTS: Product Route Validation
// We use Node.js built-in test runner (node:test) and assert module.
// Run with: npm test

import { test, describe } from "node:test";
import assert from "node:assert";
import http from "http";

// # IMPORT: Server factory and data from the main module
import { createServer, productData, tempOverview, tempCard, tempProduct, data } from "../index.js";

// # HELPER: Make an HTTP request and return { status, body }
function request(server, path) {
  return new Promise((resolve, reject) => {
    const port = server.address().port;
    const req = http.request({ hostname: "127.0.0.1", port, path, method: "GET" }, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });
    req.on("error", reject);
    req.end();
  });
}

// # TEST SUITE: Product Route
describe("Product Route", () => {
  let server;

  // Start a test server on a random port before each test
  test.beforeEach(() => {
    server = createServer(productData, { tempOverview, tempCard, tempProduct, data });
    server.listen(0); // port 0 = random available port
  });

  // Shut down the test server after each test
  test.afterEach(() => {
    server.close();
  });

  // # TEST: Valid product ID returns 200 and product name in HTML
  test("valid product id=0 returns 200 with product name", async () => {
    const res = await request(server, "/product?id=0");
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.includes("Fresh Avocados"), "Response should contain product name");
  });

  // # TEST: Valid string product ID returns 200
  test("valid string product id=5 returns 200", async () => {
    const res = await request(server, "/product?id=5");
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.includes("Organic Apple"), "Response should contain product name");
  });

  // # TEST: Missing id returns 404
  test("missing id returns 404", async () => {
    const res = await request(server, "/product");
    assert.strictEqual(res.status, 404);
    assert.ok(res.body.includes("Product not found"), "Response should contain friendly 404 message");
  });

  // # TEST: Non-numeric id returns 404
  test("non-numeric id=abc returns 404", async () => {
    const res = await request(server, "/product?id=abc");
    assert.strictEqual(res.status, 404);
  });

  // # TEST: Out-of-range id returns 404
  test("out-of-range id=999 returns 404", async () => {
    const res = await request(server, "/product?id=999");
    assert.strictEqual(res.status, 404);
  });

  // # TEST: Negative id returns 404
  test("negative id=-1 returns 404", async () => {
    const res = await request(server, "/product?id=-1");
    assert.strictEqual(res.status, 404);
  });

  // # TEST: Decimal id returns 404
  test("decimal id=5.5 returns 404", async () => {
    const res = await request(server, "/product?id=5.5");
    assert.strictEqual(res.status, 404);
  });

  // # TEST: Empty id returns 404
  test("empty id returns 404", async () => {
    const res = await request(server, "/product?id=");
    assert.strictEqual(res.status, 404);
  });
});

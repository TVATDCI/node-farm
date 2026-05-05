# Node Farm Product Route — Planning Brief

## Context

Node Farm is a beginner-friendly Node.js learning project (repository: TVATDCI/node-farm). It serves a simple product catalog with HTML pages and a JSON API. The codebase has multiple git branches showing progression:

- `feature/basic-nodeJs` — single-file CommonJS
- `feature/modules` — modularized CommonJS
- `feature/es6` — ES6 modules (`"type": "module"`) — **TARGET BRANCH**
- `feature/async-await` — async patterns

Current state on `feature/es6`:
- Overview page (`/overview`) renders a grid of product cards — **COMPLETE**
- API endpoint (`/api`) returns raw JSON — **COMPLETE**
- Product detail page (`/product?id={n}`) is a **PLACEHOLDER** — it directly does `productData[query.id]` with no validation
- 404 handling exists only for unknown routes, not for invalid product IDs
- The project uses native `http` module, `slugify` for URL slugs, and simple template string replacement

## Work Objectives

1. **Complete the `/product?id={n}` route** to safely show individual product details
   - Validate that `id` query parameter is present
   - Validate that `id` corresponds to an existing product
   - Use the existing `replaceTemplate` module and `template-product.html`
   - Keep the beginner-friendly comment style (clear section markers, simple code)

2. **Add proper 404 handling for invalid product IDs**
   - Missing `id` parameter → 404 with friendly HTML message
   - Non-numeric or out-of-range `id` → 404 with friendly HTML message
   - Re-use the same response style as the existing generic 404

3. **Keep beginner-friendly style**
   - Clear comment blocks with section markers (`// # ROUTE: ...`)
   - Simple, readable code (no complex frameworks, no over-engineering)
   - Match the existing code style exactly

4. **Optional: Add basic tests**
   - If scope allows within this plan, add simple tests for the `/product` route
   - Use a lightweight test runner (Node.js built-in `assert` or `node:test` since this is a learning project)
   - Test cases: valid product ID, missing ID, out-of-range ID, non-numeric ID

## Verification Criteria

- [ ] `/product?id=0` renders the Fresh Avocados detail page with correct data
- [ ] `/product?id=12` renders the Bell Peppers detail page
- [ ] `/product` (no id) returns 404 with friendly HTML
- [ ] `/product?id=999` returns 404 with friendly HTML
- [ ] `/product?id=abc` returns 404 with friendly HTML
- [ ] `/product?id=-1` returns 404 with friendly HTML
- [ ] All existing routes (`/`, `/overview`, `/api`) continue to work
- [ ] Code style matches the existing `feature/es6` branch (ES6 imports, section comment markers)
- [ ] (Optional) Tests pass for all `/product` scenarios

## First Execution Wave

1. Validate current `feature/es6` state — confirm file structure and template placeholders
2. Implement product ID validation and 404 responses in `index.js`
3. Manual QA: test all valid and invalid product ID scenarios
4. (Optional) Write basic route tests
5. Integration verification — confirm no regressions in overview/API routes

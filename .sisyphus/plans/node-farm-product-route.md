# Plan: Node Farm — Product Detail Route & Error Handling

## TL;DR

Complete the `/product?id={n}` route on the `feature/es6` branch with robust input validation, friendly 404 responses, and optional basic tests. Keep the beginner-friendly code style and ES6 module structure.

## Deliverables

1. `/product` route validates `id` query param and returns 404 for missing/invalid IDs
2. `/product?id={n}` renders product detail page for valid IDs using template replacement
3. `index.js` refactored to export a `createServer()` factory for testability
4. (Optional) `tests/product.test.js` with `node:test` covering valid/invalid product ID scenarios
5. `package.json` updated with `"test": "node --test"` script
6. No regressions in `/overview`, `/api`, or generic 404 routes

## Effort Estimate: Short

---

## Wave 1: Route Validation & Server Refactor

### Task 1.1: Implement `/product` route validation and 404 handling

**Blocked by:** None (first slice — tracer bullet)

**What:** Update the `/product` route in `index.js` to validate `query.id` per the PRD validation algorithm and return friendly 404 HTML for invalid inputs.

**Acceptance Criteria:**
- [x] `query.id` is validated: reject undefined, null, empty string, whitespace-only string, non-numeric, decimal, negative, or non-existent IDs
- [x] Valid IDs use `productData.find(p => Number(p.id) === parsedId)` for lookup
- [x] Invalid IDs return 404 with `text/html` and a friendly message matching the existing 404 style
- [x] Existing `/overview` and `/api` routes remain unchanged and functional
- [x] Code style matches existing comment markers (`// # ROUTE: ...`)

**Evidence path:** `.sisyphus/evidence/node-farm-product-route-task-1-1-tdd-log.md`

### Task 1.2: Extract `createServer()` factory for testability

**Blocked by:** Task 1.1

**What:** Refactor `index.js` so server creation is exportable. The default behavior (listen on port 8000) should remain when the file is run directly, but tests can import and start the server on a random port.

**Acceptance Criteria:**
- [x] `createServer(productData, templates)` function exported from `index.js`
- [x] `index.js` still starts the server on port 8000 when run with `node index.js`
- [x] `createServer` returns an `http.Server` instance (not yet listening)
- [x] Tests can import `createServer`, call `.listen(0)`, make requests, and `.close()` cleanly

**Evidence path:** `.sisyphus/evidence/node-farm-product-route-task-1-2-tdd-log.md`

---

## Wave 2: Tests & Final Verification

### Task 2.1: Add basic route tests

**Blocked by:** Task 1.2

**What:** Create `tests/product.test.js` using `node:test` and `node:assert`. Cover all product ID scenarios.

**Acceptance Criteria:**
- [x] `npm test` runs without errors
- [x] Test: valid product ID (`?id=0`) → 200 and HTML contains product name
- [x] Test: missing `id` → 404
- [x] Test: non-numeric `id` (`?id=abc`) → 404
- [x] Test: out-of-range `id` (`?id=999`) → 404
- [x] Test: negative `id` (`?id=-1`) → 404
- [x] Test: decimal `id` (`?id=5.5`) → 404
- [x] Test: empty `id` (`?id=`) → 404
- [x] Tests start server on random port, make requests, shut down cleanly

**Evidence path:** `.sisyphus/evidence/node-farm-product-route-task-2-1-tdd-log.md`

### Task 2.2: Manual QA & regression verification

**Blocked by:** Task 1.1, Task 2.1

**What:** Browser-based verification and confirm no regressions.

**Acceptance Criteria:**
- [x] `http://localhost:8000/product?id=0` → Fresh Avocados detail page
- [x] `http://localhost:8000/product?id=12` → Bell Peppers detail page
- [x] `http://localhost:8000/product` → 404 friendly HTML
- [x] `http://localhost:8000/product?id=999` → 404 friendly HTML
- [x] `http://localhost:8000/product?id=abc` → 404 friendly HTML
- [x] `http://localhost:8000/product?id=-1` → 404 friendly HTML
- [x] `http://localhost:8000/overview` → overview page works
- [x] `http://localhost:8000/api` → JSON API works
- [x] `http://localhost:8000/unknown` → generic 404 still works

**Evidence path:** `.sisyphus/evidence/node-farm-product-route-task-2-2-qa-log.md`

---

## Integration + Final Verification (blocked by all above)

- [x] **Task 3.1: Integration + Final Verification**
  - What: Verify all modules work together, run full test suite, confirm PRD compliance
  - Output: All tests passing, PRD acceptance criteria checked off
  - Verify:
    - [x] All PRD user stories satisfied
    - [x] All tests passing (attach test logs)
    - [x] No debug code or TODO markers left (existing `console.log` calls are intentional and pre-existing)
    - [x] `npm test` script exists and works
    - [x] No regressions in existing routes

---

## PRD Reference

`.sisyphus/prds/node-farm-product-route-prd.md`

## Target Branch

`feature/es6`

## Notes

- Keep code beginner-friendly: clear comments, simple logic, no complex abstractions
- The optional test slice is strongly recommended because it validates the 404 behavior empirically
- If `createServer()` extraction proves complex, an alternative is to test via HTTP requests to the running server on port 8000 (document the deviation in evidence)

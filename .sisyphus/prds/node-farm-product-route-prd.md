# PRD: Node Farm — Product Detail Route & Error Handling

## Problem Statement

The Node Farm project currently renders an overview page and serves a JSON API, but the `/product?id={n}` detail page is an unsafe placeholder. It directly indexes into the product array without validating the query parameter, which causes:
- `undefined` being passed to `replaceTemplate` when `id` is missing or invalid
- No dedicated 404 response for invalid product IDs
- A poor user experience and potential runtime errors

## Solution Overview

Add robust input validation to the `/product` route so that:
1. Valid product IDs render the full product detail page using the existing template system
2. Missing, non-numeric, or out-of-range IDs return a friendly 404 HTML response
3. The implementation follows the existing ES6 module pattern and beginner-friendly comment style

## User Stories

### Slice 1: Product Route Validation & 404 Handling
- **Story 1a**: As a user, when I visit `/product?id=0`, I see the Fresh Avocados detail page with all fields populated correctly.
- **Story 1b**: As a user, when I visit `/product` without an `id`, I see a friendly 404 page telling me the product was not found.
- **Story 1c**: As a user, when I visit `/product?id=abc` or `/product?id=999`, I see a friendly 404 page telling me the product was not found.
- **Story 1d**: As a user, when I visit `/product?id=-1`, I see a friendly 404 page telling me the product was not found.
- **Story 1e**: As a user, when I visit `/product?id=5.5` or `/product?id=` (empty string), I see a friendly 404 page telling me the product was not found.

### Slice 2: Basic Route Tests (Optional)
- **Story 2a**: As a developer, I can run `npm test` to verify that all `/product` scenarios (valid, missing, invalid IDs) behave correctly.
- **Story 2b**: As a developer, the test suite starts the server on a random available port, makes HTTP requests, and shuts down cleanly after each test.

## Implementation Decisions

### Module Boundaries

| Module | Interface (small) | Hides (large) |
|---|---|---|
| `index.js` (server) | Route handlers (`/product`, `/overview`, `/api`, 404) | HTTP server creation, request parsing, template file reading, data loading |
| `replaceTemplate.js` | `replaceTemplate(templateHtml, productObj) → string` | Regex replacement logic, organic CSS class handling |

### Technology Choices
- **Native `http` module**: Already in use. No change needed.
- **ES6 modules**: Target branch `feature/es6` already uses `"type": "module"`. Continue this pattern.
- **Template replacement**: Existing `replaceTemplate` function handles all field substitution. Re-use unchanged.
- **Test runner**: `node:test` (built-in since Node.js 18) with `node:assert` — zero dependencies, beginner-friendly, no config needed.
- **Server factory for tests**: Extract server creation into a `createServer()` function so tests can import and start it on a random port without conflicting with port 8000.

### Rejected Alternatives
- **Express.js**: Rejected because the project is a learning exercise using native `http` to teach Node.js fundamentals. Adding a framework would contradict the educational purpose.
- **Jest / Mocha**: Rejected to keep dependency footprint minimal. `node:test` is sufficient for a few route assertions.
- **Dedicated error handling middleware**: Rejected because the codebase is a single-file server. Middleware abstraction is over-engineering for this scope.

### Integration Points
- `index.js` imports `replaceTemplate` from `./modules/replaceTemplate.js` — this module requires no changes.
- `template-product.html` uses placeholders `{%PRODUCTNAME%}`, `{%IMAGE%}`, `{%FROM%}`, `{%NUTRIENTS%}`, `{%QUANTITY%}`, `{%PRICE%}`, `{%DESCRIPTION%}`, `{%ID%}`, `{%NOT_ORGANIC%}` — already present, no template changes needed.
- Data source: `dev-data/data.json` — read at startup, no changes needed.

## Decision Log

| Decision | Chosen | Rejected | Rationale |
|---|---|---|---|
| Routing framework | Native `http` | Express.js | Educational project; keep it simple |
| Test framework | `node:test` + `node:assert` | Jest, Mocha | Zero config, zero deps, built-in since Node 18 |
| 404 response style | Friendly HTML inline string | JSON error object | Matches existing generic 404 pattern in the codebase |
| Validation scope | Only `id` param | All query params | Minimal change; only the broken route needs fixing |
| Product lookup | `productData.find(p => Number(p.id) === parsedId)` | `productData[query.id]` | Decouples lookup from array position; handles mixed string/numeric IDs cleanly |
| Server lifecycle for tests | `createServer()` factory + listen in test | Child process spawning | Cleaner for beginners; tests import and control the server directly |

## Testing Decisions

### Feedback Loops
- **Unit / integration tests**: Verify each `/product` scenario via HTTP requests to a test server instance.
- **Manual QA checklist**: Browser-based verification of valid and invalid URLs.
- **Lint / format**: None configured in this project. Skip.

### TDD Approach
1. **Red**: Write tests that assert 404 for missing/invalid IDs before implementing the fix.
2. **Green**: Implement validation in `index.js` to make tests pass.
3. **Refactor**: Simplify validation logic if needed while keeping tests green.

### Test Infrastructure
- Add `"test": "node --test"` to `package.json` scripts.
- Create `tests/product.test.js` that imports `createServer` from `index.js`.
- Each test starts the server on port `0` (random available), makes requests, asserts responses, then closes the server.
- If `createServer` extraction is not feasible, fall back to spawning the server as a child process and polling the port.

### Manual QA Checkpoints
- [ ] Visit `http://localhost:8000/product?id=0` — verify Fresh Avocados page renders with all fields.
- [ ] Visit `http://localhost:8000/product?id=12` — verify Bell Peppers page renders.
- [ ] Visit `http://localhost:8000/product` — verify 404 with friendly HTML.
- [ ] Visit `http://localhost:8000/product?id=999` — verify 404 with friendly HTML.
- [ ] Visit `http://localhost:8000/product?id=abc` — verify 404 with friendly HTML.
- [ ] Visit `http://localhost:8000/product?id=-1` — verify 404 with friendly HTML.
- [ ] Visit `http://localhost:8000/overview` — verify overview still works.
- [ ] Visit `http://localhost:8000/api` — verify JSON API still works.

## Out of Scope

- Refactoring overview or API routes — they work correctly
- Adding a 404 HTML template file — use inline HTML string to match existing pattern
- Styling changes to the 404 page
- Adding tests for `/overview` or `/api` — those routes are not broken
- Pagination or search functionality
- Database or persistent storage

## Open Questions / Risks

| Risk | Mitigation |
|---|---|
| `id` values in data.json are mixed types (some numeric, some string) | Normalize both sides: parse `query.id` with `Number()`, compare against `Number(product.id)` using strict equality. This handles numeric IDs (`0`, `1`, ...) and string IDs (`"5"`, `"6"`) uniformly. |
| Data.json may gain/lose products in the future | Lookup by `product.id` instead of array index so route remains correct regardless of array order or length. |

## Error Boundaries

| Scenario | Expected Behavior |
|---|---|
| Missing `id` query param | 404 status, `text/html`, friendly message: "Product not found!" |
| `id` is not a valid integer (e.g., `abc`, `5.5`, empty string, whitespace) | 404 status, `text/html`, same friendly message |
| `id` is negative (e.g., `-1`) | 404 status, `text/html`, same friendly message |
| `id` does not match any product's `id` field (e.g., `999`) | 404 status, `text/html`, same friendly message |
| `id` is valid and matches a product | 200 status, `text/html`, rendered product detail page |
| `productData.find(...)` returns `undefined` | Must be caught by validation before calling `replaceTemplate` to prevent passing `undefined` |

### Validation Algorithm (Explicit)

```
1. If query.id is undefined or null → 404
2. If query.id is an empty string OR whitespace-only string → 404
3. Parse query.id with Number() → parsedId
4. If parsedId is NaN → 404
5. If parsedId is not an integer (e.g., 5.5) → 404
6. If parsedId < 0 → 404
7. Look up product = productData.find(p => Number(p.id) === parsedId)
8. If product is undefined → 404
9. Otherwise → render template with product
```

This algorithm rejects:
- Empty strings (`""` → rejected at step 2, because `Number("")` is `0`, not NaN)
- Whitespace strings (`"   "` → rejected at step 2, because `Number("   ")` is `0`, not NaN)
- Decimal numbers (`"5.5"` → rejected at step 5)
- Non-numeric strings (`"abc"` → rejected at step 4)
- Negative numbers (`"-1"` → rejected at step 6)
- IDs that don't exist in the dataset (`"999"` → rejected at step 8)

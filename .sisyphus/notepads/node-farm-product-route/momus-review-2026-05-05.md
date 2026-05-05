# Momus Review: node-farm-product-route
**Date:** 2026-05-05
**Reviewer:** Momus (deep analysis)
**Artifacts reviewed:**
- PRD: /home/vladi/projects/GitHub/node-farm/.sisyphus/prds/node-farm-product-route-prd.md
- Plan: not reviewed

## Summary

**Gate Decision:** FAIL
**Blocker count:** 1 total (0 critical, 1 major, 0 minor)

Prior review comparison:
- Fixed: conflicting ID-matching strategy
- Fixed: test slice now specifies `node --test`, `createServer()`, random-port startup, and clean shutdown
- Fixed: array-index coupling replaced with `productData.find(...)`
- Still blocked: empty-string / whitespace handling is described incorrectly for `Number()` and remains ambiguous in the explicit algorithm

### Top 3 Risks
1. Empty or whitespace `id` values may still resolve to product `0` if implementation follows the written algorithm literally, because JavaScript `Number("")` and `Number("   ")` return `0`, not `NaN`.
2. The PRD now has a concrete test path, but the fallback child-process note reintroduces minor implementation choice drift for beginners.
3. No other major scope or integration risks found.

## Detailed Findings

### A. Logical Contradictions
No blockers found in Logical Contradictions. The PRD now consistently chooses `Number(product.id) === parsedId` for lookup.

### B. Scope Creep
No blockers found in Scope Creep. Scope remains tightly bounded to `/product` validation plus an optional beginner-friendly test slice.

### C. Missing Verification
No blockers found in Missing Verification. Slice 2 is now executable as written: it specifies the `node --test` script, test file location, `createServer()` import, random-port binding, request assertions, and server shutdown.

### D. Dependency Gaps
No blockers found in Dependency Gaps. The planned `createServer()` extraction is sufficient to unblock route tests without adding extra frameworks or infrastructure.

### E. Integration Risks
No blockers found in Integration Risks. The PRD no longer depends on array position and now correctly anchors routing to `product.id`.

### F. Resource & Assumption Risks
F-1: MAJOR `Number()` empty-string semantics are still specified incorrectly
- Location: Validation Algorithm (Explicit), lines 125-141; Error Boundaries, lines 115-118
- Evidence: "2. Parse query.id with Number() → parsedId", "3. If parsedId is NaN → 404", and "This algorithm rejects: - Empty strings (`""` → NaN) - Whitespace strings (`"   "` → NaN)"
- Assumption: The PRD assumes `Number("")` and `Number("   ")` produce `NaN`. In JavaScript they produce `0`, so the algorithm as written would allow those cases to continue to lookup and potentially render product `0`.
- Fix: Add an explicit pre-parse guard such as "if `query.id.trim() === ''` → 404" (after confirming `query.id` is a string), or define a stricter integer-string check before `Number()`. Then keep the existing `NaN` / integer / `>= 0` checks.

## Fix Recommendations (Priority Order)

1. **MAJOR** `Number()` empty-string semantics are still specified incorrectly — add an explicit empty/whitespace rejection step before calling `Number()` and remove the incorrect claim that those cases become `NaN` — Effort: trivial

## Questions for User

1. Should the PRD explicitly reject inputs with surrounding spaces such as `?id= 5 `, or is trimming acceptable as long as whitespace-only values still 404?

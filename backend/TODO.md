# Backend Fix Log / TODO

## Step 1 (planned)
- Fix `SyntaxError: Identifier 'upload' has already been declared` in `backend/routes/adminRoutes.js` by removing the duplicate `const upload = require('../middleware/upload');`.

## Step 2 (planned)
- Restart backend (`npm run dev`) and verify server boots.

## Step 3 (planned)
- Run a quick smoke test for the admin upload endpoints (products/gallery) if applicable.


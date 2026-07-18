# Frontend reset steps (Windows)

## Goal
Clear Vite/Babel state and restart cleanly after the `src/main.jsx` fix.

## Steps
1. Stop all running Vite dev servers/terminals.
2. Delete cache:
   - `frontend/node_modules/.vite`
3. (Optional) delete any old cache from failed runs:
   - `frontend/node_modules/.cache`
4. Restart:
   - `cd frontend`
   - `npm run dev`

## Expected
- No more: `Cannot use import statement outside a module`
- App should load on the first available port (3000/3001/etc.).


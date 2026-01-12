# Local Notes (Frontend-only)

A simple, modern notes application built with React. Notes are stored entirely in the browser using `localStorage` (no backend).

## Features

- Add notes (title + multiline content)
- List notes with title + content preview
- Select a note to view it in the main pane
- Edit notes and save updates in place
- Delete notes with confirmation
- Persistence via `localStorage` (key: `local-notes`)

## How it works

All note data is managed in memory (React state) and synchronized to `localStorage` automatically whenever changes occur. On startup, the app loads existing notes from `localStorage`.

## Available scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open http://localhost:3000 to view it in the browser.

### `npm test`

Runs tests (CRA / react-scripts).

### `npm run build`

Builds the app for production into the `build/` folder.

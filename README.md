# Memory Progress Tracker

A lightweight personal productivity dashboard for tracking study habits, daily learning, and long-term progress.

## Overview

Memory Progress Tracker is a React + TypeScript app designed to help you:

- monitor your weekly activity and learning consistency
- maintain a daily log of tasks and hours spent
- track learning goals across topics like cybersecurity, DSA, and CS fundamentals
- visualize progress and stay motivated with a clean dashboard UI

## Features

- Dashboard overview with stats and weekly activity graph
- Daily Log section for recording tasks, dates, categories, and time spent
- Learning Tracker for adding learning goals and marking them complete
- Local persistence using browser storage so entries remain available between sessions
- Responsive layout built with Vite, React, and Tailwind CSS

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Recharts

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Lint the project:

   ```bash
   npm run lint
   ```

## Project Structure

```text
src/
  App.tsx          # Main application shell and dashboard navigation
  DailyLog.tsx     # Daily task logging UI and logic
  Learning.tsx     # Learning goals tracker UI and logic
  main.tsx         # Application entry point
```

## Notes

This app uses local browser storage for persistence, so data is stored in the browser rather than a backend database.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

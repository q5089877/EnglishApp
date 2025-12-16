# Hanlin English App

## Overview
A Chinese/English learning application for middle school students (翰林國中英語). This is a React + TypeScript + Vite frontend application with Tailwind CSS styling.

## Recent Changes (2024-12-16)
- Improved error handling for speech recognition with localized Chinese error messages
- Enhanced data import with detailed validation and error reporting
- Added LoadingSpinner and Toast UI components for better UX
- Created AppContext for global state management
- Implemented Service Worker for offline support with fallback page
- Fixed TypeScript errors in lesson data handling
- Installed React Router for future routing improvements

## Project Structure
- `index.html` - Main HTML entry point
- `index.tsx` - React application entry point
- `components/` - React UI components
  - `Header.tsx`, `Home.tsx`, `LessonView.tsx`, etc.
  - `LoadingSpinner.tsx` - Loading animation component
  - `Toast.tsx` - Toast notification component
- `context/AppContext.tsx` - Global state management with Context API
- `public/sw.js` - Service Worker for offline support
- `public/offline.html` - Offline fallback page
- `lessons*.ts` - Lesson data files (B1-B6 books)
- `quiz_*.ts` - Quiz engine and quiz type implementations
- `storage.ts` - Local storage utilities with improved error handling
- `speech_services.ts` - Speech recognition/synthesis with localized errors
- `sound_services.ts` - Audio/sound related services

## Development
- **Dev server**: Run `npm run dev` - starts Vite dev server on port 5000
- **Build**: Run `npm run build` - outputs to `dist/` directory

## Tech Stack
- React 18
- TypeScript
- Vite 5
- Tailwind CSS (via CDN for dev)
- React Router DOM v7
- Lucide React (icons)

## Deployment
Configured as a static site deployment. Build command produces output in `dist/` directory.

## User Preferences
- UI language: Traditional Chinese (繁體中文)
- Error messages should be in Chinese

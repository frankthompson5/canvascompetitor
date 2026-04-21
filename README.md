# AutoCourse OS — MVP Vertical Slice

This repository now contains a runnable **Phase 0 + single vertical slice** implementation for AutoCourse OS:
- Course creation form
- Mock course generation API
- Module 1 friction gates (quiz threshold, assignment submission, video submission)
- Module lock/unlock logic
- Progress percentage calculation
- Minimal tests for progression and progress math

## Stack
- Next.js (App Router)
- TypeScript
- Supabase client helper (optional env-driven initialization)
- Vitest for logic tests

## Prerequisites
- Node.js 20+
- npm 10+

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template:
   ```bash
   cp .env.example .env.local
   ```
3. (Optional) Fill Supabase and OpenAI keys in `.env.local`.
   - If `OPENAI_API_KEY` is missing, the app uses mock generation fallback.

## Run
```bash
npm run dev
```
Open http://localhost:3000.

## Test
```bash
npm test
```

## Implemented Scope
- Phase 0 foundation from backlog (basic app scaffold, env setup, app shell).
- One end-to-end generated course flow.
- Module 1 progression gates with unlock of Module 2 only after all gates are satisfied.
- Progress % from completed requirements over total requirements.

## Not Implemented Yet
- Certificate generation
- Persistent database writes
- Full multi-module execution UX

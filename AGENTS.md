# AGENTS.md

## Product
We are building an MVP called **AutoCourse OS**.

Core flow:
1. User enters a learning topic and optional constraints.
2. System generates a course with modules, lessons, resources, quizzes, assignments, and video assessments.
3. User progresses through locked modules.
4. Each module requires:
   - one quiz (pass threshold)
   - one assignment submission
   - one short video assessment
5. User receives a completion certificate only if all required items are passed.

## MVP Constraints
- Single-user app
- No team features
- No payments
- No social features
- No employer verification
- No mobile app requirement
- No LMS integrations yet
- Use mock data when external APIs are unavailable

## Product Principles
- Productive friction is required.
- Users should not be able to skip mastery gates.
- Completion must reflect demonstrated effort, not clicks.
- Keep UX simple, focused, and serious.

## Preferred Stack
- Next.js (App Router)
- TypeScript
- Supabase
- Tailwind CSS
- OpenAI API

## Required Data Models
- users
- courses
- modules
- lessons
- resources
- quizzes
- assignments
- video_assessments
- submissions
- certificates

## Engineering Rules
- Keep components small and composable.
- Prefer server actions or clean API routes.
- Add seed data for local testing.
- Keep README setup steps current.
- Add tests for generation + progression logic.

## Definition of Done (MVP)
A user can create a course, complete at least one module with all friction steps, and receive a basic certificate PDF at the end.

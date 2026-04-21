# AutoCourse OS MVP Backlog

## Phase 0 — Foundation
1. Initialize Next.js + TypeScript + Tailwind app
2. Configure Supabase client + environment variables
3. Add base layout and navigation skeleton

## Phase 1 — Core Course Generation
4. Build "Create Course" form (topic, level, duration, goal)
5. Implement generation endpoint/service (mock fallback if API key missing)
6. Persist generated course tree to database (course, modules, lessons, resources)
7. Render course dashboard with module list + lesson view

## Phase 2 — Friction + Progression
8. Implement module quiz (MCQ) with pass threshold (default: 80%)
9. Implement assignment submission flow
10. Implement video assessment upload/submission flow
11. Add progression gates and lock/unlock logic
12. Add progress tracker (% complete)

## Phase 3 — Completion
13. Generate simple certificate PDF on full completion
14. Add seeded demo course and sample data
15. Add minimal tests for generation and progression logic
16. Finalize README setup + run instructions

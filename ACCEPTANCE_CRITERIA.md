# AutoCourse OS MVP Acceptance Criteria

## 1) Course Generation
- User can submit topic, level, duration, and learning goal.
- System generates:
  - course title
  - course description
  - 4 modules (default)
  - 3 lessons per module (default)
  - at least 1 resource per lesson
  - 1 quiz, 1 assignment, and 1 video assessment prompt per module
- Generated output is saved to the database.

## 2) Module View
- User can open a generated course dashboard.
- User sees module list and selected module content.
- Each module shows lessons, resources, quiz, assignment, and video prompt.

## 3) Quiz
- Each module has a multiple-choice quiz.
- Pass threshold defaults to 80%.
- Quiz result is persisted.

## 4) Assignment Submission
- Each module has one required assignment.
- User can submit assignment text/file metadata.
- Submission is persisted and visible in module state.

## 5) Video Assessment Submission
- Each module has one required video assessment prompt.
- User can upload or attach a video submission.
- Submission status is persisted.

## 6) Progression Gate
- Next module is locked until all current module requirements are complete:
  - quiz passed
  - assignment submitted/passed
  - video assessment submitted
- Lock state updates immediately after requirement completion.

## 7) Progress Tracking
- User sees overall completion percentage.
- Completion updates as module requirements are fulfilled.

## 8) Certificate
- Certificate is available only after all modules are complete.
- Certificate includes learner name (or ID), course name, completion date, and final completion status.

## 9) MVP Constraints
- Single-user behavior is supported.
- No payment, team, marketplace, or social features.
- If external generation APIs are unavailable, mock generation still allows full flow testing.

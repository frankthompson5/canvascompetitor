import { describe, expect, it } from "vitest";
import { generateMockCourse } from "@/lib/mock-course";
import { calculateProgressPercent, isModuleComplete, isModuleLocked } from "@/lib/progression";
import { ProgressState } from "@/lib/types";

const course = generateMockCourse({
  topic: "Machine Learning",
  level: "intro",
  durationWeeks: 4,
  goalType: "practical"
});

describe("progression gates", () => {
  it("locks module 2 until module 1 quiz, assignment, and video are complete", () => {
    const progress: ProgressState = {
      m1: {
        quizScore: 100,
        assignmentSubmitted: false,
        videoSubmitted: false
      }
    };

    expect(isModuleLocked(course, "m2", progress)).toBe(true);

    progress.m1.assignmentSubmitted = true;
    progress.m1.videoSubmitted = true;

    expect(isModuleComplete(course, "m1", progress)).toBe(true);
    expect(isModuleLocked(course, "m2", progress)).toBe(false);
  });

  it("calculates progress as completed requirement ratio", () => {
    const progress: ProgressState = {
      m1: {
        quizScore: 100,
        assignmentSubmitted: true,
        videoSubmitted: false
      }
    };

    expect(calculateProgressPercent(course, progress)).toBe(17);

    progress.m1.videoSubmitted = true;
    expect(calculateProgressPercent(course, progress)).toBe(25);
  });
});

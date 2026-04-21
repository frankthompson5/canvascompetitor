import { Course, ProgressState } from "@/lib/types";

export function isQuizPassed(score: number | undefined, threshold: number): boolean {
  return typeof score === "number" && score >= threshold;
}

export function isModuleComplete(course: Course, moduleId: string, progress: ProgressState): boolean {
  const module = course.modules.find((item) => item.id === moduleId);
  if (!module) {
    return false;
  }

  const moduleProgress = progress[moduleId];
  if (!moduleProgress) {
    return false;
  }

  return (
    isQuizPassed(moduleProgress.quizScore, module.quiz.passThreshold) &&
    moduleProgress.assignmentSubmitted &&
    moduleProgress.videoSubmitted
  );
}

export function isModuleLocked(course: Course, moduleId: string, progress: ProgressState): boolean {
  const moduleIndex = course.modules.findIndex((item) => item.id === moduleId);
  if (moduleIndex <= 0) {
    return false;
  }

  const previousModule = course.modules[moduleIndex - 1];
  return !isModuleComplete(course, previousModule.id, progress);
}

export function calculateProgressPercent(course: Course, progress: ProgressState): number {
  const totalRequirements = course.modules.length * 3;
  if (totalRequirements === 0) {
    return 0;
  }

  const completed = course.modules.reduce((count, module) => {
    const moduleProgress = progress[module.id];
    if (!moduleProgress) {
      return count;
    }

    const quiz = isQuizPassed(moduleProgress.quizScore, module.quiz.passThreshold) ? 1 : 0;
    const assignment = moduleProgress.assignmentSubmitted ? 1 : 0;
    const video = moduleProgress.videoSubmitted ? 1 : 0;

    return count + quiz + assignment + video;
  }, 0);

  return Math.round((completed / totalRequirements) * 100);
}

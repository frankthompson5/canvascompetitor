import { Course, CourseInput, Module } from "@/lib/types";

function buildModule(topic: string, idx: number): Module {
  const moduleNum = idx + 1;
  const isFirst = idx === 0;

  return {
    id: `m${moduleNum}`,
    title: `Week ${moduleNum}: ${isFirst ? "Foundations" : `Applied ${topic} ${moduleNum}`}`,
    objective: `Demonstrate ${topic} competency for week ${moduleNum}.`,
    lessons: [
      {
        id: `m${moduleNum}-l1`,
        title: `${topic}: Core Concepts`,
        resource: `https://example.com/${topic.toLowerCase().replace(/\s+/g, "-")}/core-concepts`
      },
      {
        id: `m${moduleNum}-l2`,
        title: `${topic}: Applied Scenario`,
        resource: `https://example.com/${topic.toLowerCase().replace(/\s+/g, "-")}/applied-scenario`
      },
      {
        id: `m${moduleNum}-l3`,
        title: `${topic}: Reflection Notes`,
        resource: `https://example.com/${topic.toLowerCase().replace(/\s+/g, "-")}/reflection-notes`
      }
    ],
    quiz: {
      id: `m${moduleNum}-q`,
      question: `Which statement best reflects week ${moduleNum} mastery in ${topic}?`,
      options: [
        "I can define key concepts only",
        "I can apply concepts to realistic examples",
        "I memorized one definition",
        "I skipped the module"
      ],
      correctIndex: 1,
      passThreshold: 80
    },
    assignment: {
      id: `m${moduleNum}-a`,
      prompt: `Create a 1-page artifact showing how to apply ${topic} in a realistic context.`
    },
    videoAssessment: {
      id: `m${moduleNum}-v`,
      prompt: `Record a 1–3 minute explanation of your week ${moduleNum} solution and tradeoffs.`
    }
  };
}

export function generateMockCourse(input: CourseInput): Course {
  const moduleCount = Math.min(Math.max(input.durationWeeks, 3), 5);

  return {
    id: "course-1",
    title: `${input.topic} (${input.level})`,
    description: `A ${moduleCount}-week ${input.goalType} track for ${input.topic}.`,
    modules: Array.from({ length: moduleCount }, (_, idx) => buildModule(input.topic, idx))
  };
}

"use client";

import { useMemo, useState } from "react";
import { calculateProgressPercent, isModuleComplete, isModuleLocked } from "@/lib/progression";
import type { Course, CourseInput, ProgressState } from "@/lib/types";

const initialInput: CourseInput = {
  topic: "Intro to Product Management",
  level: "intro",
  durationWeeks: 4,
  goalType: "practical"
};

export function CourseBuilder() {
  const [input, setInput] = useState<CourseInput>(initialInput);
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<ProgressState>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
  const [assignmentText, setAssignmentText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const module1 = course?.modules[0] ?? null;
  const module2 = course?.modules[1] ?? null;

  const completion = useMemo(() => {
    if (!course) {
      return 0;
    }

    return calculateProgressPercent(course, progress);
  }, [course, progress]);

  const module1Complete = course && module1 ? isModuleComplete(course, module1.id, progress) : false;
  const module2Locked = course && module2 ? isModuleLocked(course, module2.id, progress) : true;

  async function generateCourse() {
    setLoading(true);
    const response = await fetch("/api/generate-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      setLoading(false);
      return;
    }

    const data = (await response.json()) as { course: Course };
    setCourse(data.course);
    setProgress({});
    setAssignmentText("");
    setVideoUrl("");
    setSelectedAnswer(0);
    setLoading(false);
  }

  function submitQuiz() {
    if (!course || !module1) {
      return;
    }

    const total = 1;
    const correct = selectedAnswer === module1.quiz.correctIndex ? 1 : 0;
    const score = Math.round((correct / total) * 100);

    setProgress((prev) => ({
      ...prev,
      [module1.id]: {
        quizScore: score,
        assignmentSubmitted: prev[module1.id]?.assignmentSubmitted ?? false,
        videoSubmitted: prev[module1.id]?.videoSubmitted ?? false
      }
    }));
  }

  function submitAssignment() {
    if (!course || !module1 || !assignmentText.trim()) {
      return;
    }

    setProgress((prev) => ({
      ...prev,
      [module1.id]: {
        quizScore: prev[module1.id]?.quizScore,
        assignmentSubmitted: true,
        videoSubmitted: prev[module1.id]?.videoSubmitted ?? false
      }
    }));
  }

  function submitVideo() {
    if (!course || !module1 || !videoUrl.trim()) {
      return;
    }

    setProgress((prev) => ({
      ...prev,
      [module1.id]: {
        quizScore: prev[module1.id]?.quizScore,
        assignmentSubmitted: prev[module1.id]?.assignmentSubmitted ?? false,
        videoSubmitted: true
      }
    }));
  }

  return (
    <>
      <section className="card">
        <h2>Create course</h2>
        <div className="row">
          <input
            value={input.topic}
            onChange={(e) => setInput((prev) => ({ ...prev, topic: e.target.value }))}
            aria-label="Topic"
          />
          <select
            value={input.level}
            onChange={(e) => setInput((prev) => ({ ...prev, level: e.target.value as CourseInput["level"] }))}
            aria-label="Level"
          >
            <option value="intro">Intro</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
          <select
            value={input.durationWeeks}
            onChange={(e) => setInput((prev) => ({ ...prev, durationWeeks: Number(e.target.value) }))}
            aria-label="Duration"
          >
            {[3, 4, 5].map((weeks) => (
              <option key={weeks} value={weeks}>
                {weeks} weeks
              </option>
            ))}
          </select>
          <button onClick={generateCourse} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </section>

      {course ? (
        <>
          <section className="card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p className="status">Progress: {completion}%</p>
          </section>

          {module1 ? (
            <section className="card">
              <h3>{module1.title}</h3>
              <p>{module1.objective}</p>
              <ul>
                {module1.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    {lesson.title} — <a href={lesson.resource}>{lesson.resource}</a>
                  </li>
                ))}
              </ul>

              <h4>Quiz (must score {module1.quiz.passThreshold}%+)</h4>
              <p>{module1.quiz.question}</p>
              <div className="row">
                {module1.quiz.options.map((option, idx) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="quiz"
                      checked={selectedAnswer === idx}
                      onChange={() => setSelectedAnswer(idx)}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <button onClick={submitQuiz}>Submit quiz</button>

              <h4>Assignment</h4>
              <p>{module1.assignment.prompt}</p>
              <textarea
                rows={4}
                value={assignmentText}
                onChange={(e) => setAssignmentText(e.target.value)}
                placeholder="Paste assignment response"
              />
              <br />
              <button onClick={submitAssignment}>Submit assignment</button>

              <h4>Video assessment</h4>
              <p>{module1.videoAssessment.prompt}</p>
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste video URL"
                aria-label="Video URL"
              />
              <button onClick={submitVideo}>Submit video</button>

              <p className={module1Complete ? "good" : "warn"}>
                {module1Complete ? "Module 1 complete. Next module unlocked." : "Module 1 incomplete. Complete all three gates."}
              </p>
            </section>
          ) : null}

          {module2 ? (
            <section className={`card ${module2Locked ? "locked" : ""}`}>
              <h3>{module2.title}</h3>
              <p>{module2Locked ? "Locked until Module 1 is fully complete." : "Unlocked."}</p>
            </section>
          ) : null}
        </>
      ) : null}
    </>
  );
}

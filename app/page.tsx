import { CourseBuilder } from "@/components/course-builder";

export default function HomePage() {
  return (
    <main>
      <h1>AutoCourse OS MVP</h1>
      <p>Generate one course, complete Module 1 gates, and unlock Module 2.</p>
      <CourseBuilder />
    </main>
  );
}

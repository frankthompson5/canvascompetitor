import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateMockCourse } from "@/lib/mock-course";
import type { CourseInput } from "@/lib/types";

const inputSchema = z.object({
  topic: z.string().min(3),
  level: z.enum(["intro", "intermediate", "expert"]),
  durationWeeks: z.number().min(3).max(5),
  goalType: z.enum(["career-ready", "academic", "practical"])
});

export async function POST(request: NextRequest) {
  const body = (await request.json()) as CourseInput;
  const parsed = inputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const apiKeyPresent = Boolean(process.env.OPENAI_API_KEY);
  const course = generateMockCourse(parsed.data);

  return NextResponse.json({
    course,
    source: apiKeyPresent ? "mock-fallback" : "mock-no-api-key"
  });
}

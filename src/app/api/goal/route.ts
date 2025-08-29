import { NextResponse } from "next/server";
import { getUserByClerkId } from "~/lib/queries/user";
import { createGoal } from "~/lib/queries/goal"; // You’ll create this file
import { z } from "zod";

const CreateGoalSchema = z.object({
  title: z.string(),
  userId: z.string(),
  type: z.enum(["WORKOUT_COUNT", "DISTANCE", "TIME"]),
  target: z.number().int().positive(),
  unit: z.enum(["WORKOUTS", "KM", "MINUTES"]),
  startDate: z.string().transform((d) => new Date(d)),
  endDate: z.string().transform((d) => new Date(d)),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  const user = await getUserByClerkId(userId);
  return NextResponse.json(user);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CreateGoalSchema.parse(body);

    const newGoal = await createGoal(parsed);
    return NextResponse.json(newGoal, { status: 201 });
  } catch (err) {
    console.error("Failed to create goal", err);
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}

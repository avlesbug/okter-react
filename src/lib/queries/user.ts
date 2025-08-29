// lib/user.ts
import { db } from "../prisma";
import type { UserSummary } from "~/lib/types";
import { startOfYear, endOfYear } from "date-fns";

export async function getUserByClerkId(clerkId: string) {
  return await db.user.findUnique({
    where: { clerkId: clerkId },
    include: {
      goals: true
    },
  });
}

export async function getUserSummary(userId: string): Promise<UserSummary> {
  const currentYearStart = startOfYear(new Date());
  const currentYearEnd = endOfYear(new Date());

  const [user, workoutCount] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: {
        goals: true,
        workouts: {
          orderBy: { date: "desc" },
          take: 1,
          select: { date: true },
        },
      },
    }),
    db.workout.count({
      where: {
        userId,
        date: {
          gte: currentYearStart,
          lte: currentYearEnd,
        },
      },
    }),
  ]);

  return {
    goals: user?.goals ?? [],
    lastWorkoutDate: user?.workouts?.[0]?.date ?? null,
    workoutCount,
  };
}

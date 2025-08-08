import type { GoalType, GoalUnit } from "@prisma/client";
import { db } from "../prisma";


export type CreateGoalInput = {
  title: string;
  userId: string;
  type: GoalType;
  target: number;
  unit: GoalUnit;
  startDate: Date;
  endDate: Date;
};

export async function getGoalsByUserId(userId: string) {
  return await db.goal.findUnique({
    where: { id: userId },
  });
}

export async function createGoal(input: CreateGoalInput) {
  const goal = await db.goal.create({
    data: {
      title: input.title,
      userId: input.userId,
      type: input.type,
      target: input.target,
      unit: input.unit,
      startDate: input.startDate,
      endDate: input.endDate,
    },
  });

  return goal;
}
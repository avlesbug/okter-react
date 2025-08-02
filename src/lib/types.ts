import type { Goal } from "@prisma/client";
import { Prisma } from "@prisma/client";

export type UserWithGoals = Prisma.UserGetPayload<{
  include: {
    goals: true;
  };
}>;

export type UserSummary = {
  goals: Goal[];
  workoutCount: number;
  lastWorkoutDate: Date | null;
};

export type NewGoalDTO = {
  title: Goal["title"];
  type: Goal["type"];
  target: Goal["target"];
  unit: Goal["unit"];
  startDate: Goal["startDate"];
  endDate: Goal["endDate"];
}
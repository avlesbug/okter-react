import { db } from "../prisma";

export const getWorkoutsInRange = (userId: string, startDate: Date, endDate: Date) => {
  const workoutCount =
    db.workout.count({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  return workoutCount;
}
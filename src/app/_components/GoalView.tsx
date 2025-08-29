import type { Goal } from "@prisma/client";
import { OkterCounter } from "~/app/_components/OkterCounter";
import { LastWorkout } from "~/app/_components/LastWorkout";

interface Props {
  goal: Goal;
}

export const GoalView = ({ goal } : Props) => {

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-xl font-extrabold tracking-tight sm:text-[3rem]">
        {goal.title}
      </h1>
      <OkterCounter
        target={goal.target}
        workoutCount={123}
        onIncrease={() => {}}
        onDecrease={() => {}}
        detailedIncrease={() => {}}
      />
      <LastWorkout lastWorkoutDate={"I går"} />
    </div>
  );
};

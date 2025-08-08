import { type Goal, GoalType, GoalUnit } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "~/components/ui/carousel";
import { GoalView } from "~/app/_components/GoalView";
import { NewGoalDialog } from "~/app/_components/NewGoalDialog";

interface Props {
  goals: Goal[];
}

export const GoalCarousel = ({ goals }: Props) => {

  return (
    <>
      <NewGoalDialog />
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {goals.map((goal) => {
            return (
              <CarouselItem key={goal.id}>
                <GoalView key={goal.id} goal={goal} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
};


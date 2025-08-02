import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { OptionsSelector } from "~/components/ui/options-selector";
import { Input } from "~/components/ui/input";
import { DatePicker } from "~/components/ui/datePicker";
import type { NewGoalDTO } from "~/lib/types";
import { GoalType, GoalUnit } from "@prisma/client";
import { useEffect, useState } from "react";

export const NewGoalDialog = () => {
  const [newGoal, setNewGoal] = useState<NewGoalDTO>({
    title: '',
    type: GoalType.WORKOUT_COUNT,
    target: 0,
    unit: GoalUnit.WORKOUTS,
    startDate: new Date(),
    endDate: new Date(),
  });
  const setSelectedGoalType = (goalType: string) => {
    setNewGoal((prevState) => {
      return {
        ...prevState,
        type: goalType as GoalType,
      };
    });
  };

  const handleSubmit = () => {
    console.log("submit with new goal: " + newGoal.type);
  };

  useEffect(() => {
    console.log(newGoal);
  }, [newGoal]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">New goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Goal</DialogTitle>
        </DialogHeader>
        <div className="grid justify-center gap-4">
          <div className="grid gap-3">
            <Label htmlFor="target-input" className="text-lg">
              Title
            </Label>
            <Input
              id="title-input"
              placeholder={"Set title..."}
              type={"text"}
              onChange={(e) => {
                setNewGoal((prevState) => {
                  return {
                    ...prevState,
                    title: e.target.value,
                  }
                })
              }}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name-1" className="text-lg">
              Goal type
            </Label>
            <OptionsSelector
              className={"flex gap-2"}
              options={[
                ["Number of workouts", "WORKOUT_COUNT"],
                ["Distance", "DISTANCE"],
                ["Time", "TIME"],
              ]}
              onSelect={setSelectedGoalType}
              selected={newGoal.type}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="target-input" className="text-lg">
              Target
            </Label>
            <Input
              id="target-input"
              name="target"
              defaultValue="@peduarte"
              type={"number"}
              onChange={(e) => {
                setNewGoal((prevState) => {
                  return {
                    ...prevState,
                    target: parseInt(e.target.value),
                  }
                })
              }}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="start-date-intput" className="text-lg">
              Start date
            </Label>
            <DatePicker
              date={newGoal.startDate}
              setDate={(date) => {
                if (date) {
                  setNewGoal((prevState) => {
                    return {
                      ...prevState,
                      startDate: date,
                    };
                  });
                }
              }}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="end-date-intput" className="text-lg">
              End date
            </Label>
            <DatePicker
              date={newGoal.endDate}
              setDate={(date) => {
                if (date) {
                  setNewGoal((prevState) => {
                    return {
                      ...prevState,
                      endDate: date,
                    };
                  });
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

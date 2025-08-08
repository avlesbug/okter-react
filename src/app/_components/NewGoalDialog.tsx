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
import { DistanceUnits, type NewGoalDTO, TimeUnits } from "~/lib/types";
import { GoalType, GoalUnit } from "@prisma/client";
import { useEffect, useState } from "react";
import { SelectComponent } from "~/app/_components/SelectComponent";
import axios from "axios";

export const NewGoalDialog = () => {
  const [newGoal, setNewGoal] = useState<NewGoalDTO>({
    userId: 'PjN5WvnNM6ZAoJ6xD4sVwCkARiC2',
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

  const getDefaultUnit = (goalType: GoalType) => {
    switch (goalType) {
      case GoalType.DISTANCE:
        return GoalUnit.KM;
      case GoalType.TIME:
        return GoalUnit.HOURS;
      case GoalType.WORKOUT_COUNT:
        return GoalUnit.WORKOUTS;
    }
  }

  const handleSubmit = async () => {
    try {
      const formattedGoal = {
        ...newGoal,
        startDate: newGoal.startDate.toISOString(),
        endDate: newGoal.endDate.toISOString(),
      };

      console.log(formattedGoal);
      const response = await axios.post("/api/goal", formattedGoal);
      console.log("Goal created successfully:", response.data);
    } catch (error) {
      console.error("Error creating goal:", error);
    }

  };

  useEffect(() => {
    console.log('setting new unit: ' + getDefaultUnit(newGoal.type));
    setNewGoal((prevState) => {
      return {
        ...prevState,
        unit: getDefaultUnit(newGoal.type),
      }
    })
  }, [newGoal.type]);


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
              options={[GoalType.WORKOUT_COUNT, GoalType.DISTANCE, GoalType.TIME]}
              onSelect={setSelectedGoalType}
              selected={newGoal.type}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="target-input" className="text-lg">
              Target
            </Label>
            <div className="flex gap-2">
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
              {newGoal.type !== GoalType.WORKOUT_COUNT && <SelectComponent
                value={newGoal.unit}
                onChange={(value) => {
                  setNewGoal((prevState) => {
                    return {
                      ...prevState,
                      unit: value.toUpperCase() as GoalUnit,
                    };
                  });
                }}
                options={newGoal.type === GoalType.DISTANCE ? DistanceUnits : TimeUnits} />}
            </div>
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

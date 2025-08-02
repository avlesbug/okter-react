"use client";

import { useEffect, useState } from "react";
import type { UserWithGoals } from "~/lib/types";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { GoalCarousel } from "~/app/_components/GoalCarousel";

export default function Home() {
  const [user, setUser] = useState<UserWithGoals>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const userRes = await axios.get("/api/user", {
            params: { userId: "PjN5WvnNM6ZAoJ6xD4sVwCkARiC2" },
          }
        );

        setUser(userRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    void fetchData();
  }, []);

  useEffect(() => {
    console.log(user)
  }, [user]);


  // const userQuery = api.user.getUser.useQuery({
  //   userId: "PjN5WvnNM6ZAoJ6xD4sVwCkARiC2",
  // });
  // const workoutCountRequest = api.user.getWorkoutsByRange.useQuery(
  //   {
  //     userId: "PjN5WvnNM6ZAoJ6xD4sVwCkARiC2",
  //     fromDate,
  //     toDate: now,
  //   }
  // );

  // useEffect(() => {
  //   if (userQuery.data === undefined) return;
  //   setUser(userQuery.data);
  // }, [userQuery]);
  //
  // useEffect(() => {
  //   if (user === undefined) return;
  //   if (user.workouts === undefined) return;
  //   const lastWorkoutDate = formatWorkoutDate(
  //     user.workouts.length > 0
  //       ? user.workouts[user.workouts.length - 1].date
  //       : new Date(),
  //   );
  //   setWorkoutCount(workoutCountRequest.data);
  //   setLastWorkoutDate(lastWorkoutDate);
  // }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#141213] text-white">
      {loading && <ScaleLoader color={"white"}/>}
      {user && <GoalCarousel goals={user.goals}/>}
    </main>
  );
}

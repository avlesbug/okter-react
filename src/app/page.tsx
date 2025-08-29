"use client";

import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { GoalCarousel } from "~/app/_components/GoalCarousel";
import { useUserContext } from "~/context/UserContext";
import { getGoalsByUserId } from "~/lib/queries/goal";


export default function Home() {
  const {user, loading} = useUserContext();
  const goals = await getGoalsByUserId(user.id);

  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {loading && <ScaleLoader color={"white"}/>}
      {user && <GoalCarousel goals={goals}/>}
    </div>
  );
}

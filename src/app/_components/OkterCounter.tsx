"use client";

import { Plus, Minus } from "lucide-react"
import { prettyString } from "~/lib/utils";

interface Props {
    target: number,
    workoutCount: number,
    onIncrease: () => void,
    onDecrease: () => void,
    detailedIncrease: () => void
}

export const OkterCounter = ({target, workoutCount, onDecrease, onIncrease, detailedIncrease} : Props) => {
    return (
        <div className="gap-4">
            <h2 className="text-xl font-extrabold tracking-tight sm:text-[3rem]">
            {`${workoutCount} / ${target}`}
            </h2>
            <div className="flex items-center justify-center gap-6 md:gap-21 lg:gap-21">
                <div role="button" onClick={() => onDecrease()}><Minus size={46}/></div>
                <div role="button" onClick={() => onIncrease()}><Plus size={46}/></div>
            </div>
        </div>
    )

}
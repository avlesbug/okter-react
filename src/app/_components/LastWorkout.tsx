interface Props {
    lastWorkoutDate: string
}

export const LastWorkout = ({lastWorkoutDate} : Props) => {
    return <>
    <h2 className="text-xl tracking-tight sm:text-[2rem]">
            <span className="font-bold">Siste økt: </span><span className="orange-light">{lastWorkoutDate}</span> 
            </h2>
    </>
}
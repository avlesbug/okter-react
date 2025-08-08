-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profileImage" TEXT,
    "goal" INTEGER,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalRecords" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ovelse" TEXT NOT NULL,
    "vekt" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalRecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "legacyWorkoutPlan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardioWorkout" (
    "id" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "workoutPlanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CardioWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistanceWorkout" (
    "id" TEXT NOT NULL,
    "cardioWorkoutId" TEXT NOT NULL,
    "distanceKm" DOUBLE PRECISION NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DistanceWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntervalWorkout" (
    "id" TEXT NOT NULL,
    "cardioWorkoutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntervalWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntervalSegment" (
    "id" TEXT NOT NULL,
    "intervalWorkoutId" TEXT NOT NULL,
    "distanceKm" DOUBLE PRECISION NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "restSeconds" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntervalSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrengthWorkout" (
    "id" TEXT NOT NULL,
    "workoutPlanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StrengthWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrengthExercise" (
    "id" TEXT NOT NULL,
    "strengthWorkoutId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StrengthExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPlan_workoutId_key" ON "WorkoutPlan"("workoutId");

-- CreateIndex
CREATE UNIQUE INDEX "CardioWorkout_workoutPlanId_key" ON "CardioWorkout"("workoutPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "DistanceWorkout_cardioWorkoutId_key" ON "DistanceWorkout"("cardioWorkoutId");

-- CreateIndex
CREATE UNIQUE INDEX "IntervalWorkout_cardioWorkoutId_key" ON "IntervalWorkout"("cardioWorkoutId");

-- CreateIndex
CREATE UNIQUE INDEX "StrengthWorkout_workoutPlanId_key" ON "StrengthWorkout"("workoutPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "StrengthExercise_strengthWorkoutId_key" ON "StrengthExercise"("strengthWorkoutId");

-- AddForeignKey
ALTER TABLE "PersonalRecords" ADD CONSTRAINT "PersonalRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardioWorkout" ADD CONSTRAINT "CardioWorkout_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistanceWorkout" ADD CONSTRAINT "DistanceWorkout_cardioWorkoutId_fkey" FOREIGN KEY ("cardioWorkoutId") REFERENCES "CardioWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalWorkout" ADD CONSTRAINT "IntervalWorkout_cardioWorkoutId_fkey" FOREIGN KEY ("cardioWorkoutId") REFERENCES "CardioWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervalSegment" ADD CONSTRAINT "IntervalSegment_intervalWorkoutId_fkey" FOREIGN KEY ("intervalWorkoutId") REFERENCES "IntervalWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrengthWorkout" ADD CONSTRAINT "StrengthWorkout_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrengthExercise" ADD CONSTRAINT "StrengthExercise_strengthWorkoutId_fkey" FOREIGN KEY ("strengthWorkoutId") REFERENCES "StrengthWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

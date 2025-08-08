/*
  Warnings:

  - You are about to drop the column `endDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PersonalRecords` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('WORKOUT_COUNT', 'DISTANCE', 'TIME');

-- CreateEnum
CREATE TYPE "GoalUnit" AS ENUM ('WORKOUTS', 'KM', 'MINUTES');

-- DropForeignKey
ALTER TABLE "PersonalRecords" DROP CONSTRAINT "PersonalRecords_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "endDate",
DROP COLUMN "goal";

-- DropTable
DROP TABLE "PersonalRecords";

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "GoalType" NOT NULL,
    "target" INTEGER NOT NULL,
    "unit" "GoalUnit" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ovelse" TEXT NOT NULL,
    "vekt" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalRecord" ADD CONSTRAINT "PersonalRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

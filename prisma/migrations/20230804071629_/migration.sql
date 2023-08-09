/*
  Warnings:

  - You are about to drop the `assessments_state` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test_taker_assessment_config` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "testTakerAssessmentState" AS ENUM ('SENT', 'IN_PROGRESS', 'FINISHED');

-- DropForeignKey
ALTER TABLE "assessments_state" DROP CONSTRAINT "assessments_state_assessmentId_fkey";

-- DropForeignKey
ALTER TABLE "assessments_state" DROP CONSTRAINT "assessments_state_testTakerId_fkey";

-- DropForeignKey
ALTER TABLE "test_taker_assessment_config" DROP CONSTRAINT "test_taker_assessment_config_assessmentId_fkey";

-- DropForeignKey
ALTER TABLE "test_taker_assessment_config" DROP CONSTRAINT "test_taker_assessment_config_testTakerId_fkey";

-- AlterTable
ALTER TABLE "assessments" ALTER COLUMN "retake" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "test_takers" ALTER COLUMN "firstname" DROP NOT NULL;

-- DropTable
DROP TABLE "assessments_state";

-- DropTable
DROP TABLE "test_taker_assessment_config";

-- CreateTable
CREATE TABLE "test_taker_assessment" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "testTakerId" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "state" "testTakerAssessmentState" NOT NULL,
    "resultId" TEXT,

    CONSTRAINT "test_taker_assessment_pkey" PRIMARY KEY ("testTakerId","assessmentId")
);

-- AddForeignKey
ALTER TABLE "test_taker_assessment" ADD CONSTRAINT "test_taker_assessment_testTakerId_fkey" FOREIGN KEY ("testTakerId") REFERENCES "test_takers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_taker_assessment" ADD CONSTRAINT "test_taker_assessment_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

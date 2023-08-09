/*
  Warnings:

  - Added the required column `name` to the `assessments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retake` to the `assessments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assessments" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "retake" INTEGER NOT NULL;

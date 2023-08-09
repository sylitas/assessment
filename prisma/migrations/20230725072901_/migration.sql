/*
  Warnings:

  - The primary key for the `assessments_exams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `examtId` on the `assessments_exams` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `exams` table. All the data in the column will be lost.
  - You are about to drop the column `examtId` on the `questions` table. All the data in the column will be lost.
  - Added the required column `examId` to the `assessments_exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "questionType" AS ENUM ('MULTIPLE_CHOICES', 'MULTIPLE_RESPONSE', 'ESSAY', 'MEDIA');

-- DropForeignKey
ALTER TABLE "assessments_exams" DROP CONSTRAINT "assessments_exams_examtId_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_examtId_fkey";

-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "file" TEXT,
ALTER COLUMN "isCorrect" DROP DEFAULT;

-- AlterTable
ALTER TABLE "assessments_exams" DROP CONSTRAINT "assessments_exams_pkey",
DROP COLUMN "examtId",
ADD COLUMN     "examId" TEXT NOT NULL,
ADD CONSTRAINT "assessments_exams_pkey" PRIMARY KEY ("assessmentId", "examId");

-- AlterTable
ALTER TABLE "exams" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "examtId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "shuffleAnswer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "questionType" NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

-- DropEnum
DROP TYPE "examType";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions_categories" (
    "questionId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "questions_categories_pkey" PRIMARY KEY ("questionId","categoryId")
);

-- CreateTable
CREATE TABLE "exams_questions" (
    "examId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exams_questions_pkey" PRIMARY KEY ("examId","questionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_key" ON "categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "assessments_exams" ADD CONSTRAINT "assessments_exams_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions_categories" ADD CONSTRAINT "questions_categories_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions_categories" ADD CONSTRAINT "questions_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams_questions" ADD CONSTRAINT "exams_questions_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams_questions" ADD CONSTRAINT "exams_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

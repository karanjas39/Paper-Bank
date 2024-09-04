/*
  Warnings:

  - You are about to drop the column `reviewMessage` on the `QuestionPaper` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedAt` on the `QuestionPaper` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionPaper" DROP COLUMN "reviewMessage",
DROP COLUMN "reviewedAt";

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

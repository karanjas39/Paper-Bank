-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "academicLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "otp" TEXT NOT NULL DEFAULT '',
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "programId" INTEGER NOT NULL,
    "uploadCount" INTEGER NOT NULL DEFAULT 0,
    "maxUploads" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionPaper" (
    "id" SERIAL NOT NULL,
    "courseName" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "fileKeys" TEXT[],
    "year" TEXT NOT NULL,
    "examType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionPaper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Program_name_key" ON "Program"("name");

-- CreateIndex
CREATE INDEX "Program_name_idx" ON "Program"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_programId_idx" ON "User"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionPaper_fileKeys_key" ON "QuestionPaper"("fileKeys");

-- CreateIndex
CREATE INDEX "QuestionPaper_status_idx" ON "QuestionPaper"("status");

-- CreateIndex
CREATE INDEX "QuestionPaper_userId_idx" ON "QuestionPaper"("userId");

-- CreateIndex
CREATE INDEX "QuestionPaper_reviewerId_idx" ON "QuestionPaper"("reviewerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionPaper" ADD CONSTRAINT "QuestionPaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionPaper" ADD CONSTRAINT "QuestionPaper_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

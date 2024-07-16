-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ReqTeacherGender" AS ENUM ('MALE', 'FEMALE', 'ALL');

-- CreateEnum
CREATE TYPE "Verification" AS ENUM ('BLUE', 'GOLD', 'NONE');

-- CreateEnum
CREATE TYPE "ReqTeacherVerif" AS ENUM ('BLUE', 'GOLD', 'NONE', 'ALL');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('WAITING_FOR_START', 'STARTED', 'FINISHED');

-- CreateEnum
CREATE TYPE "TeachingType" AS ENUM ('ONLINE', 'OFFILINE', 'ALL');

-- CreateEnum
CREATE TYPE "CourseReqStatus" AS ENUM ('ACCEPTED', 'DENIED', 'PENDING');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "birth_date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "teaching_type" "TeachingType" NOT NULL DEFAULT 'OFFILINE',
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "birth_date" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "about_teacher" TEXT NOT NULL,
    "Verification" "Verification" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,
    "gradeId" TEXT,
    "lessonId" TEXT,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(5) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_number" INTEGER NOT NULL,
    "course_time_start" TEXT NOT NULL,
    "teaching_type" "TeachingType" NOT NULL DEFAULT 'OFFILINE',
    "course_time_end" TEXT NOT NULL,
    "course_status" "CourseStatus" NOT NULL DEFAULT 'WAITING_FOR_START',
    "teacherId" TEXT,
    "studentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorseRequest" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "req_teacher_gender" "ReqTeacherGender" NOT NULL DEFAULT 'ALL',
    "req_teacher_verification" "ReqTeacherVerif" NOT NULL DEFAULT 'ALL',
    "cors_req_status" "CourseReqStatus" NOT NULL DEFAULT 'PENDING',
    "teaching_type" "TeachingType" NOT NULL DEFAULT 'OFFILINE',
    "categoryId" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CorseRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "gradeId" TEXT,
    "lessonId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "grade_name" TEXT NOT NULL,
    "lessonId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_phone_key" ON "Student"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_phone_key" ON "Teacher"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Course_course_number_key" ON "Course"("course_number");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorseRequest" ADD CONSTRAINT "CorseRequest_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorseRequest" ADD CONSTRAINT "CorseRequest_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorseRequest" ADD CONSTRAINT "CorseRequest_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorseRequest" ADD CONSTRAINT "CorseRequest_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

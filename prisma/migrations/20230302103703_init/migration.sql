-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitterRecord" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "isComment" BOOLEAN NOT NULL DEFAULT false,
    "parentRecordId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwitterRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "TwitterRecord" ADD CONSTRAINT "TwitterRecord_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterRecord" ADD CONSTRAINT "TwitterRecord_parentRecordId_fkey" FOREIGN KEY ("parentRecordId") REFERENCES "TwitterRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

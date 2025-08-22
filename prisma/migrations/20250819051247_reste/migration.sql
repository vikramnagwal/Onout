-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "verificationToken" TEXT NOT NULL,
    "resetPasswordToken" TEXT,
    "rasedTicketComplain" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_verificationToken_key" ON "Token"("verificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "Token_resetPasswordToken_key" ON "Token"("resetPasswordToken");

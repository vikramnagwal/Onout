-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uniquePageLink" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'Basic',
    "totalMessages" INTEGER DEFAULT 0,
    "totalViews" INTEGER DEFAULT 0,
    "totalClicks" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workspaceId" TEXT NOT NULL,
    "slug" TEXT,
    "content" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "IpAddress" TEXT,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Messages_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessiontokens" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_uniquePageLink_key" ON "Workspace"("uniquePageLink");

-- CreateIndex
CREATE INDEX "Workspace_userId_uniquePageLink_id_totalMessages_idx" ON "Workspace"("userId", "uniquePageLink", "id", "totalMessages");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_id_userId_uniquePageLink_key" ON "Workspace"("id", "userId", "uniquePageLink");

-- CreateIndex
CREATE INDEX "Messages_workspaceId_content_views_idx" ON "Messages"("workspaceId", "content", "views");

-- CreateIndex
CREATE UNIQUE INDEX "Messages_workspaceId_key" ON "Messages"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessiontokens_key" ON "Session"("sessiontokens");

-- CreateIndex
CREATE INDEX "Session_userId_sessiontokens_expires_idx" ON "Session"("userId", "sessiontokens", "expires");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_expires_key" ON "VerificationToken"("identifier", "token", "expires");

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Messages" (
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
INSERT INTO "new_Messages" ("IpAddress", "clicks", "content", "createdAt", "id", "slug", "source", "updatedAt", "views", "workspaceId") SELECT "IpAddress", "clicks", "content", "createdAt", "id", "slug", "source", "updatedAt", "views", "workspaceId" FROM "Messages";
DROP TABLE "Messages";
ALTER TABLE "new_Messages" RENAME TO "Messages";
CREATE INDEX "Messages_workspaceId_content_views_idx" ON "Messages"("workspaceId", "content", "views");
CREATE UNIQUE INDEX "Messages_workspaceId_key" ON "Messages"("workspaceId");
CREATE TABLE "new_Workspace" (
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
INSERT INTO "new_Workspace" ("createdAt", "id", "name", "plan", "totalClicks", "totalMessages", "totalViews", "uniquePageLink", "updatedAt", "userId") SELECT "createdAt", "id", "name", "plan", "totalClicks", "totalMessages", "totalViews", "uniquePageLink", "updatedAt", "userId" FROM "Workspace";
DROP TABLE "Workspace";
ALTER TABLE "new_Workspace" RENAME TO "Workspace";
CREATE UNIQUE INDEX "Workspace_uniquePageLink_key" ON "Workspace"("uniquePageLink");
CREATE INDEX "Workspace_userId_uniquePageLink_id_totalMessages_idx" ON "Workspace"("userId", "uniquePageLink", "id", "totalMessages");
CREATE UNIQUE INDEX "Workspace_id_userId_uniquePageLink_key" ON "Workspace"("id", "userId", "uniquePageLink");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

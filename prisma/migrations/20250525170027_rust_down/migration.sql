/*
  Warnings:

  - Added the required column `domain` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Workspace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'public',
    "plan" TEXT NOT NULL DEFAULT 'Basic',
    "totalMessages" INTEGER DEFAULT 0,
    "totalViews" INTEGER DEFAULT 0,
    "totalClicks" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Workspace" ("createdAt", "id", "plan", "slug", "totalClicks", "totalMessages", "totalViews", "type", "updatedAt", "userId") SELECT "createdAt", "id", "plan", "slug", "totalClicks", "totalMessages", "totalViews", "type", "updatedAt", "userId" FROM "Workspace";
DROP TABLE "Workspace";
ALTER TABLE "new_Workspace" RENAME TO "Workspace";
CREATE UNIQUE INDEX "Workspace_slug_key" ON "Workspace"("slug");
CREATE UNIQUE INDEX "Workspace_domain_key" ON "Workspace"("domain");
CREATE UNIQUE INDEX "Workspace_userId_key" ON "Workspace"("userId");
CREATE INDEX "Workspace_userId_id_totalMessages_idx" ON "Workspace"("userId", "id", "totalMessages");
CREATE UNIQUE INDEX "Workspace_id_slug_userId_key" ON "Workspace"("id", "slug", "userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

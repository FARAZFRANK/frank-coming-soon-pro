-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'LIVE',
    "templateId" TEXT NOT NULL DEFAULT 'template_1',
    "title" TEXT NOT NULL DEFAULT 'Coming Soon',
    "description" TEXT NOT NULL DEFAULT 'We are currently under maintenance. Please check back later.',
    "logoUrl" TEXT,
    "bgImageUrl" TEXT,
    "countdownDate" TEXT,
    "maintenanceScope" TEXT NOT NULL DEFAULT 'ALL',
    "selectedResources" TEXT,
    "socialLinks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Settings" ("bgImageUrl", "countdownDate", "createdAt", "description", "id", "logoUrl", "mode", "shop", "templateId", "title", "updatedAt") SELECT "bgImageUrl", "countdownDate", "createdAt", "description", "id", "logoUrl", "mode", "shop", "templateId", "title", "updatedAt" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
CREATE UNIQUE INDEX "Settings_shop_key" ON "Settings"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

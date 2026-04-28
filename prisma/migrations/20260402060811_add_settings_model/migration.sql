-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'LIVE',
    "templateId" TEXT NOT NULL DEFAULT 'template_1',
    "title" TEXT NOT NULL DEFAULT 'Coming Soon',
    "description" TEXT NOT NULL DEFAULT 'We are currently under maintenance. Please check back later.',
    "logoUrl" TEXT,
    "bgImageUrl" TEXT,
    "countdownDate" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_shop_key" ON "Settings"("shop");

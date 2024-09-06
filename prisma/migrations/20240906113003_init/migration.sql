-- CreateTable
CREATE TABLE "contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_mobile_key" ON "contact"("mobile");

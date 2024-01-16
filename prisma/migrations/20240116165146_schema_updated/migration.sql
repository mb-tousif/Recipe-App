/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `recipes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipes_title_key" ON "recipes"("title");

/*
  Warnings:

  - You are about to drop the `_IngredientToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredient` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_IngredientToRecipe_B_index";

-- DropIndex
DROP INDEX "_IngredientToRecipe_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_IngredientToRecipe";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "ingredient" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_recipes" ("createdAt", "id", "image", "instructions", "title", "updatedAt") SELECT "createdAt", "id", "image", "instructions", "title", "updatedAt" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
CREATE UNIQUE INDEX "recipes_title_key" ON "recipes"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

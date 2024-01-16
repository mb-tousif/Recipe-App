-- CreateTable
CREATE TABLE "ingredients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToRecipe" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_IngredientToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_IngredientToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_label_key" ON "ingredients"("label");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToRecipe_AB_unique" ON "_IngredientToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToRecipe_B_index" ON "_IngredientToRecipe"("B");

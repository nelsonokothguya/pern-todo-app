/*
  Warnings:

  - You are about to drop the column `originalId` on the `DeletedTodo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeletedTodo" DROP CONSTRAINT "DeletedTodo_originalId_fkey";

-- AlterTable
ALTER TABLE "DeletedTodo" DROP COLUMN "originalId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "DeletedTodo_id_seq";

-- AddForeignKey
ALTER TABLE "DeletedTodo" ADD CONSTRAINT "DeletedTodo_id_fkey" FOREIGN KEY ("id") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

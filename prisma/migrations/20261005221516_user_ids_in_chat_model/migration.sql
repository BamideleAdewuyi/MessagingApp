/*
  Warnings:

  - You are about to drop the column `userids` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "userids",
ADD COLUMN     "userIds" INTEGER[];

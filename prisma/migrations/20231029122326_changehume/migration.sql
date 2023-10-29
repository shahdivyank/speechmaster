/*
  Warnings:

  - You are about to drop the column `emotion` on the `hume` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `hume` table. All the data in the column will be lost.
  - Added the required column `emotionName` to the `hume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `hume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hume" DROP COLUMN "emotion";
ALTER TABLE "hume" DROP COLUMN "timeStamp";
ALTER TABLE "hume" ADD COLUMN     "emotionName" STRING NOT NULL;
ALTER TABLE "hume" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

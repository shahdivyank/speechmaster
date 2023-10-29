/*
  Warnings:

  - You are about to drop the column `timeStamp` on the `posture` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `posture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posture" DROP COLUMN "timeStamp";
ALTER TABLE "posture" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

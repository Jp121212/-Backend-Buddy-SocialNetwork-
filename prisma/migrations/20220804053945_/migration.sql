/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommentTweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommentUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FileUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FollowRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikeTweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikeUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TweetFiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserTweets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CommentTweet" DROP CONSTRAINT "_CommentTweet_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentTweet" DROP CONSTRAINT "_CommentTweet_B_fkey";

-- DropForeignKey
ALTER TABLE "_CommentUser" DROP CONSTRAINT "_CommentUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentUser" DROP CONSTRAINT "_CommentUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_FileUser" DROP CONSTRAINT "_FileUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FileUser" DROP CONSTRAINT "_FileUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_FollowRelation" DROP CONSTRAINT "_FollowRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_FollowRelation" DROP CONSTRAINT "_FollowRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikeTweet" DROP CONSTRAINT "_LikeTweet_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikeTweet" DROP CONSTRAINT "_LikeTweet_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikeUser" DROP CONSTRAINT "_LikeUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikeUser" DROP CONSTRAINT "_LikeUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_TweetFiles" DROP CONSTRAINT "_TweetFiles_A_fkey";

-- DropForeignKey
ALTER TABLE "_TweetFiles" DROP CONSTRAINT "_TweetFiles_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserTweets" DROP CONSTRAINT "_UserTweets_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTweets" DROP CONSTRAINT "_UserTweets_B_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "bio",
DROP COLUMN "createdAt",
DROP COLUMN "photo",
DROP COLUMN "updatedAt",
DROP COLUMN "username",
DROP COLUMN "website",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "File";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "Tweet";

-- DropTable
DROP TABLE "_CommentTweet";

-- DropTable
DROP TABLE "_CommentUser";

-- DropTable
DROP TABLE "_FileUser";

-- DropTable
DROP TABLE "_FollowRelation";

-- DropTable
DROP TABLE "_LikeTweet";

-- DropTable
DROP TABLE "_LikeUser";

-- DropTable
DROP TABLE "_TweetFiles";

-- DropTable
DROP TABLE "_UserTweets";

-- CreateTable
CREATE TABLE "Follows" (
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

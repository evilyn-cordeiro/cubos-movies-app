/*
  Warnings:

  - You are about to drop the column `genre` on the `Movie` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `originalTitle` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `description` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `imageUrl` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Added the required column `language` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profit` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revenue` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `successRate` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteCount` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "genre",
ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "language" VARCHAR(50) NOT NULL,
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "profit" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "revenue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" VARCHAR(50) NOT NULL,
ADD COLUMN     "successRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tagline" VARCHAR(100),
ADD COLUMN     "voteCount" INTEGER NOT NULL,
ADD COLUMN     "youtubeUrl" VARCHAR(255),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "originalTitle" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "imageUrl" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

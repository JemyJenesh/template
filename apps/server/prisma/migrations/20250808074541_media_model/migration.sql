/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "image",
ADD COLUMN     "mediaId" TEXT;

-- CreateTable
CREATE TABLE "public"."Media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "public"."Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

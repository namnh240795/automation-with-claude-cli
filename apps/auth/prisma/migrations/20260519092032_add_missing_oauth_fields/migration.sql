/*
  Warnings:

  - Added the required column `updated_at` to the `o_auth_user_consent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "o_auth_authorization_code" ADD COLUMN     "consumed_at" TIMESTAMP(3),
ADD COLUMN     "nonce" TEXT;

-- AlterTable
ALTER TABLE "o_auth_user_consent" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

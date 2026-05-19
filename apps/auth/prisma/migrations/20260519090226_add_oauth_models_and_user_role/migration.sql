-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "o_auth_authorization_code" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "scope" TEXT,
    "redirect_uri" TEXT NOT NULL,
    "state" TEXT,
    "code_challenge" TEXT,
    "code_challenge_method" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used_at" TIMESTAMP(3),

    CONSTRAINT "o_auth_authorization_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "o_auth_device_code" (
    "id" TEXT NOT NULL,
    "device_code" TEXT NOT NULL,
    "user_code" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "user_id" TEXT,
    "scope" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "interval" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "o_auth_device_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "o_auth_user_consent" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "scope" TEXT[],
    "granted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3),
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "o_auth_user_consent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "o_auth_authorization_code_code_key" ON "o_auth_authorization_code"("code");

-- CreateIndex
CREATE INDEX "o_auth_authorization_code_code_idx" ON "o_auth_authorization_code"("code");

-- CreateIndex
CREATE INDEX "o_auth_authorization_code_client_id_idx" ON "o_auth_authorization_code"("client_id");

-- CreateIndex
CREATE INDEX "o_auth_authorization_code_user_id_idx" ON "o_auth_authorization_code"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "o_auth_device_code_device_code_key" ON "o_auth_device_code"("device_code");

-- CreateIndex
CREATE UNIQUE INDEX "o_auth_device_code_user_code_key" ON "o_auth_device_code"("user_code");

-- CreateIndex
CREATE INDEX "o_auth_device_code_device_code_idx" ON "o_auth_device_code"("device_code");

-- CreateIndex
CREATE INDEX "o_auth_device_code_user_code_idx" ON "o_auth_device_code"("user_code");

-- CreateIndex
CREATE INDEX "o_auth_device_code_client_id_idx" ON "o_auth_device_code"("client_id");

-- CreateIndex
CREATE INDEX "o_auth_user_consent_user_id_idx" ON "o_auth_user_consent"("user_id");

-- CreateIndex
CREATE INDEX "o_auth_user_consent_client_id_idx" ON "o_auth_user_consent"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "o_auth_user_consent_user_id_client_id_key" ON "o_auth_user_consent"("user_id", "client_id");

-- AddForeignKey
ALTER TABLE "o_auth_authorization_code" ADD CONSTRAINT "o_auth_authorization_code_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "o_auth_client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "o_auth_device_code" ADD CONSTRAINT "o_auth_device_code_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "o_auth_client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "o_auth_user_consent" ADD CONSTRAINT "o_auth_user_consent_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "o_auth_client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

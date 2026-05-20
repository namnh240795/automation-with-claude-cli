-- AlterTable
ALTER TABLE "user" ADD COLUMN     "user_type" TEXT NOT NULL DEFAULT 'PERSONAL';

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'BUSINESS',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_organization" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "organization_role" TEXT NOT NULL DEFAULT 'MEMBER',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "user_organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_invitation" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "invited_by" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "accepted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organization_invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_display_id_key" ON "organization"("display_id");

-- CreateIndex
CREATE INDEX "organization_display_id_idx" ON "organization"("display_id");

-- CreateIndex
CREATE INDEX "organization_type_idx" ON "organization"("type");

-- CreateIndex
CREATE INDEX "organization_is_active_idx" ON "organization"("is_active");

-- CreateIndex
CREATE INDEX "organization_deleted_at_idx" ON "organization"("deleted_at");

-- CreateIndex
CREATE INDEX "user_organization_user_id_idx" ON "user_organization"("user_id");

-- CreateIndex
CREATE INDEX "user_organization_organization_id_idx" ON "user_organization"("organization_id");

-- CreateIndex
CREATE INDEX "user_organization_organization_role_idx" ON "user_organization"("organization_role");

-- CreateIndex
CREATE INDEX "user_organization_deleted_at_idx" ON "user_organization"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_organization_user_id_organization_id_key" ON "user_organization"("user_id", "organization_id");

-- CreateIndex
CREATE INDEX "organization_invitation_email_idx" ON "organization_invitation"("email");

-- CreateIndex
CREATE INDEX "organization_invitation_organization_id_idx" ON "organization_invitation"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_invitation_organization_id_email_key" ON "organization_invitation"("organization_id", "email");

-- AddForeignKey
ALTER TABLE "user_organization" ADD CONSTRAINT "user_organization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_organization" ADD CONSTRAINT "user_organization_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_invitation" ADD CONSTRAINT "organization_invitation_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

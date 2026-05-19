-- CreateTable
CREATE TABLE "o_auth_client" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "client_secret_hash" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "redirect_uris" TEXT[],
    "post_logout_redirect_uris" TEXT[],
    "scopes" TEXT[],
    "grant_types" TEXT[],
    "is_confidential" BOOLEAN NOT NULL DEFAULT true,
    "is_public_client" BOOLEAN NOT NULL DEFAULT false,
    "require_pkce" BOOLEAN NOT NULL DEFAULT true,
    "access_token_lifetime" INTEGER NOT NULL DEFAULT 3600,
    "refresh_token_lifetime" INTEGER NOT NULL DEFAULT 2592000,
    "allowed_origins" TEXT[],
    "logo_uri" TEXT,
    "policy_uri" TEXT,
    "tos_uri" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "permissions" TEXT[],
    "owner_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "o_auth_client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "o_auth_access_token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "user_id" TEXT,
    "scope" TEXT,
    "permissions" TEXT[],
    "roles" TEXT[],
    "token_type" TEXT NOT NULL DEFAULT 'Bearer',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "o_auth_access_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "o_auth_refresh_token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "access_token_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "user_id" TEXT,
    "scope" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "o_auth_refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permission" (
    "id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_role" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "o_auth_client_client_id_key" ON "o_auth_client"("client_id");

-- CreateIndex
CREATE INDEX "o_auth_client_client_id_idx" ON "o_auth_client"("client_id");

-- CreateIndex
CREATE INDEX "o_auth_client_owner_id_idx" ON "o_auth_client"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "o_auth_access_token_token_key" ON "o_auth_access_token"("token");

-- CreateIndex
CREATE INDEX "o_auth_access_token_token_idx" ON "o_auth_access_token"("token");

-- CreateIndex
CREATE INDEX "o_auth_access_token_client_id_idx" ON "o_auth_access_token"("client_id");

-- CreateIndex
CREATE INDEX "o_auth_access_token_user_id_idx" ON "o_auth_access_token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "o_auth_refresh_token_token_key" ON "o_auth_refresh_token"("token");

-- CreateIndex
CREATE INDEX "o_auth_refresh_token_token_idx" ON "o_auth_refresh_token"("token");

-- CreateIndex
CREATE INDEX "o_auth_refresh_token_client_id_idx" ON "o_auth_refresh_token"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_name_key" ON "permission"("name");

-- CreateIndex
CREATE INDEX "permission_resource_idx" ON "permission"("resource");

-- CreateIndex
CREATE INDEX "permission_name_idx" ON "permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE INDEX "role_name_idx" ON "role"("name");

-- CreateIndex
CREATE INDEX "role_permission_role_id_idx" ON "role_permission"("role_id");

-- CreateIndex
CREATE INDEX "role_permission_permission_id_idx" ON "role_permission"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_permission_role_id_permission_id_key" ON "role_permission"("role_id", "permission_id");

-- CreateIndex
CREATE INDEX "client_role_client_id_idx" ON "client_role"("client_id");

-- CreateIndex
CREATE INDEX "client_role_role_id_idx" ON "client_role"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "client_role_client_id_role_id_key" ON "client_role"("client_id", "role_id");

-- AddForeignKey
ALTER TABLE "o_auth_access_token" ADD CONSTRAINT "o_auth_access_token_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "o_auth_client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "o_auth_refresh_token" ADD CONSTRAINT "o_auth_refresh_token_access_token_id_fkey" FOREIGN KEY ("access_token_id") REFERENCES "o_auth_access_token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "o_auth_refresh_token" ADD CONSTRAINT "o_auth_refresh_token_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "o_auth_client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_role" ADD CONSTRAINT "client_role_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "o_auth_client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_role" ADD CONSTRAINT "client_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

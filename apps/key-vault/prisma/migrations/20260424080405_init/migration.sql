-- CreateTable
CREATE TABLE "environment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setting" (
    "id" TEXT NOT NULL,
    "service_name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'STATIC',
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setting_value" (
    "id" TEXT NOT NULL,
    "setting_id" TEXT NOT NULL,
    "environment_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "change_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "setting_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setting_value_history" (
    "id" TEXT NOT NULL,
    "setting_id" TEXT NOT NULL,
    "environment_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "change_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "setting_value_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "environment_name_key" ON "environment"("name");

-- CreateIndex
CREATE INDEX "environment_name_idx" ON "environment"("name");

-- CreateIndex
CREATE INDEX "environment_is_active_idx" ON "environment"("is_active");

-- CreateIndex
CREATE INDEX "setting_service_name_idx" ON "setting"("service_name");

-- CreateIndex
CREATE INDEX "setting_key_idx" ON "setting"("key");

-- CreateIndex
CREATE INDEX "setting_type_idx" ON "setting"("type");

-- CreateIndex
CREATE INDEX "setting_is_active_idx" ON "setting"("is_active");

-- CreateIndex
CREATE INDEX "setting_deleted_at_idx" ON "setting"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "setting_service_name_key_key" ON "setting"("service_name", "key");

-- CreateIndex
CREATE INDEX "setting_value_setting_id_idx" ON "setting_value"("setting_id");

-- CreateIndex
CREATE INDEX "setting_value_environment_id_idx" ON "setting_value"("environment_id");

-- CreateIndex
CREATE UNIQUE INDEX "setting_value_setting_id_environment_id_version_key" ON "setting_value"("setting_id", "environment_id", "version");

-- CreateIndex
CREATE INDEX "setting_value_history_setting_id_idx" ON "setting_value_history"("setting_id");

-- CreateIndex
CREATE INDEX "setting_value_history_environment_id_idx" ON "setting_value_history"("environment_id");

-- CreateIndex
CREATE INDEX "setting_value_history_version_idx" ON "setting_value_history"("version");

-- AddForeignKey
ALTER TABLE "setting_value" ADD CONSTRAINT "setting_value_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "setting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setting_value" ADD CONSTRAINT "setting_value_environment_id_fkey" FOREIGN KEY ("environment_id") REFERENCES "environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setting_value_history" ADD CONSTRAINT "setting_value_history_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "setting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setting_value_history" ADD CONSTRAINT "setting_value_history_environment_id_fkey" FOREIGN KEY ("environment_id") REFERENCES "environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

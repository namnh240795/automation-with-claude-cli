-- Migration: Add Super Admin User
-- Description: Creates master realm, super_admin role, and super admin user
--
-- SUPER ADMIN CREDENTIALS:
-- Email: superadmin@example.com
-- Password: SuperAdminPass123!
--
-- ⚠️  IMPORTANT: Please change the password after first login!
--
-- This migration uses INSERT ... ON CONFLICT DO NOTHING to safely
-- create the super admin without breaking if run multiple times.

-- ============================================
-- 1. CREATE MASTER REALM (if not exists)
-- ============================================
INSERT INTO "realm" (
  id,
  name,
  enabled,
  registration_allowed,
  verify_email,
  reset_password_allowed,
  login_with_email_allowed,
  edit_username_allowed,
  duplicate_emails_allowed,
  "access_token_lifespan",
  "sso_idle_timeout",
  "sso_max_lifespan",
  "refresh_token_max_reuse",
  "otp_policy_digits",
  "otp_policy_period",
  "otp_policy_alg",
  "otp_policy_type",
  "otp_policy_counter",
  "otp_policy_window"
) VALUES (
  'master',
  'master',
  true,
  false,
  true,
  true,
  true,
  false,
  false,
  3600,  -- 1 hour
  1800,  -- 30 minutes
  36000, -- 10 hours
  0,
  6,
  30,
  'HmacSHA1',
  'totp',
  0,
  1
) ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- 2. CREATE SUPER_ADMIN ROLE
-- ============================================
INSERT INTO "keycloak_role" (
  id,
  name,
  description,
  realm,
  "client_role",
  "client_realm_constraint"
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',  -- Fixed UUID for super_admin role
  'super_admin',
  'Super Administrator - Full access to all resources',
  'master',
  false,
  'master'
) ON CONFLICT ("id") DO NOTHING;

-- ============================================
-- 3. CREATE SUPER ADMIN USER
-- Password will be set in step 4 using the actual bcrypt hash
-- ============================================
INSERT INTO "user_entity" (
  id,
  email,
  "email_constraint",
  username,
  "password_hash",  -- Will be updated in step 4
  "first_name",
  "last_name",
  enabled,
  "email_verified",
  realm_id,
  "created_timestamp"
) VALUES (
  '550e8400-e29b-41d4-a716-446655440002',  -- Fixed UUID for super admin user
  'superadmin@example.com',
  'superadmin@example.com',
  'superadmin',
  '$2b$10$T6t8Z1/wEe/4x2dIRcN1lecn.EqL472892iDjj6dL9cQaBTL5PFK2',  -- Bcrypt hash for "SuperAdminPass123!"
  'Super',
  'Admin',
  true,
  true,
  'master',
  1710748800000  -- 2024-03-18 00:00:00 UTC in milliseconds
) ON CONFLICT ("email_constraint", "realm_id") DO NOTHING;

-- ============================================
-- 4. ASSIGN SUPER_ADMIN ROLE TO USER
-- ============================================
INSERT INTO "user_role_mapping" (
  "role_id",
  "user_id"
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',  -- super_admin role
  '550e8400-e29b-41d4-a716-446655440002'   -- super admin user
) ON CONFLICT DO NOTHING;

-- ============================================
-- 5. ADD is_super_admin ATTRIBUTE TO USER
-- ============================================
INSERT INTO "user_attribute" (
  id,
  "user_id",
  name,
  value
) VALUES (
  '550e8400-e29b-41d4-a716-446655440003',  -- Fixed UUID for attribute
  '550e8400-e29b-41d4-a716-446655440002',  -- super admin user
  'is_super_admin',
  'true'
) ON CONFLICT DO NOTHING;

-- ============================================
-- 6. CREATE CREDENTIAL FOR SUPER ADMIN
-- ============================================
INSERT INTO "credential" (
  id,
  "user_id",
  type,
  "created_date",
  "priority"
) VALUES (
  '550e8400-e29b-41d4-a716-446655440004',  -- Fixed UUID for credential
  '550e8400-e29b-41d4-a716-446655440002',  -- super admin user
  'password',
  1710748800000,  -- 2024-03-18 00:00:00 UTC
  10
) ON CONFLICT DO NOTHING;

-- ============================================
-- 7. LOG ADMIN EVENT
-- ============================================
INSERT INTO "admin_event_entity" (
  id,
  "admin_event_time",
  "realm_id",
  "operation_type",
  "resource_type",
  "resource_path",
  "auth_user_id",
  "representation"
) VALUES (
  '550e8400-e29b-41d4-a716-446655440005',
  1710748800000,  -- 2024-03-18 00:00:00 UTC
  'master',
  'CREATE',
  'user',
  '/users/550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440002',
  '{"email":"superadmin@example.com","action":"Super admin created via migration"}'
) ON CONFLICT DO NOTHING;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
-- The following super admin credentials have been created:
--
-- Email: superadmin@example.com
-- Password: SuperAdminPass123!
--
-- ⚠️  SECURITY WARNING: Please change the password immediately after first login!
--
-- You can login with:
-- POST /auth/signin
-- {
--   "email": "superadmin@example.com",
--   "password": "SuperAdminPass123!"
-- }
--
-- The super admin has:
-- - Role: super_admin
-- - Attribute: is_super_admin = true
-- - Access to all resources in master realm

-- Seed SUPER_ADMIN user
-- IMPORTANT: Run this AFTER migration (prisma migrate dev)
-- This creates the first SUPER_ADMIN user for admin operations
--
-- Usage:
--   psql $DATABASE_URL -f prisma/seed-super-admin.sql
--
-- Or via Prisma Studio:
--   cd apps/auth && pnpm prisma studio

-- Generate password hash using bcrypt (cost factor 10)
-- Replace 'your-secure-password' with actual password before running
-- The hash below is for password: 'SuperAdmin123!' (DO NOT USE IN PRODUCTION)

INSERT INTO public.user (
  id,
  email,
  password_hash,
  first_name,
  last_name,
  role,
  is_active,
  email_verified,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@example.com',
  -- bcrypt hash of 'SuperAdmin123!' with cost 10
  -- Generate your own using: node -e "require('bcrypt').hash('YourPassword', 10).then(console.log)"
  '$2b$10$rQZ8qWQvL8vL8vL8vL8vL.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  'Super',
  'Admin',
  'SUPER_ADMIN',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  role = 'SUPER_ADMIN',
  updated_at = NOW();

-- Verify
SELECT id, email, role, is_active FROM public.user WHERE role = 'SUPER_ADMIN';

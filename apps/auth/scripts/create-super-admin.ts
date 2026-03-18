/**
 * Script to generate bcrypt hash for super admin password
 * Run this before applying the migration if you want to change the password
 *
 * Usage:
 *   cd apps/auth
 *   pnpm ts-node scripts/create-super-admin.ts
 */

import * as bcrypt from 'bcrypt';

const SUPER_ADMIN_EMAIL = 'superadmin@example.com';
const SUPER_ADMIN_PASSWORD = 'SuperAdminPass123!'; // Change this if needed

async function main() {
  console.log('🔐 Generating bcrypt hash for super admin...\n');
  console.log(`Email: ${SUPER_ADMIN_EMAIL}`);
  console.log(`Password: ${SUPER_ADMIN_PASSWORD}\n`);

  // Generate bcrypt hash (salt rounds: 10)
  const hash = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 10);

  console.log('✅ Bcrypt Hash Generated:\n');
  console.log(hash);
  console.log('\n' + '='.repeat(80));
  console.log('Copy this hash and replace the password_hash value in:');
  console.log('apps/auth/prisma/migrations/20260318105111_add_super_admin/migration.sql');
  console.log('='.repeat(80) + '\n');

  // Verify the hash works
  const isValid = await bcrypt.compare(SUPER_ADMIN_PASSWORD, hash);
  console.log('Verification:', isValid ? '✅ Password matches hash' : '❌ Password does not match');

  console.log('\n📝 Migration Instructions:\n');
  console.log('1. Update the migration.sql with the hash above');
  console.log('2. Run: cd apps/auth && pnpm prisma migrate dev');
  console.log('3. Test login with the credentials\n');
}

main().catch(console.error);

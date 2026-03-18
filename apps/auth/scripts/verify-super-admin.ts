/**
 * Verification script to check if super admin was created successfully
 *
 * Usage:
 *   cd apps/auth
 *   pnpm ts-node scripts/verify-super-admin.ts
 */

import { PrismaClient } from '@auth/prisma-client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Verifying Super Admin Setup...\n');

  // Check if realm exists
  console.log('1️⃣  Checking Master Realm...');
  const realm = await prisma.realm.findUnique({
    where: { id: 'master' },
  });

  if (!realm) {
    console.log('   ❌ Master realm not found');
    console.log('   💡 Run: pnpm prisma migrate dev');
    return;
  }
  console.log('   ✅ Master realm exists');
  console.log(`   Name: ${realm.name}`);
  console.log(`   Enabled: ${realm.enabled}\n`);

  // Check if super admin role exists
  console.log('2️⃣  Checking Super Admin Role...');
  const role = await prisma.keycloak_role.findFirst({
    where: {
      name: 'super_admin',
      realm: 'master',
    },
  });

  if (!role) {
    console.log('   ❌ Super admin role not found');
    return;
  }
  console.log('   ✅ Super admin role exists');
  console.log(`   ID: ${role.id}`);
  console.log(`   Description: ${role.description}\n`);

  // Check if super admin user exists
  console.log('3️⃣  Checking Super Admin User...');
  const user = await prisma.user.findFirst({
    where: {
      email: 'superadmin@example.com',
    },
    include: {
      user_role_mapping: {
        include: {
          // @ts-ignore - relation field
          role: true,
        },
      },
      user_attribute: true,
    },
  });

  if (!user) {
    console.log('   ❌ Super admin user not found');
    console.log('   💡 Run: pnpm prisma migrate dev');
    return;
  }
  console.log('   ✅ Super admin user exists');
  console.log(`   ID: ${user.id}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Username: ${user.username}`);
  console.log(`   Enabled: ${user.enabled}`);
  console.log(`   Email Verified: ${user.email_verified}\n`);

  // Check role assignment
  console.log('4️⃣  Checking Role Assignment...');
  const hasRole = user.user_role_mapping.some(
    (mapping) => // @ts-ignore
    mapping.role?.name === 'super_admin',
  );

  if (!hasRole) {
    console.log('   ❌ Super admin role not assigned to user');
    return;
  }
  console.log('   ✅ Super admin role assigned to user\n');

  // Check super admin attribute
  console.log('5️⃣  Checking Super Admin Attribute...');
  const hasAttribute = user.user_attribute.some(
    (attr) => attr.name === 'is_super_admin' && attr.value === 'true',
  );

  if (!hasAttribute) {
    console.log('   ❌ is_super_admin attribute not found');
    return;
  }
  console.log('   ✅ is_super_admin attribute exists\n');

  // Test credentials
  console.log('6️⃣  Testing Credentials...\n');
  console.log('   Email: superadmin@example.com');
  console.log('   Password: SuperAdminPass123!');
  console.log('\n   Test login with:');
  console.log('   curl -X POST http://localhost:3001/auth/signin \\');
  console.log('     -H "Content-Type: application/json" \\');
  console.log('     -d \'{"email":"superadmin@example.com","password":"SuperAdminPass123!"}\'\n');

  console.log('🎉 All checks passed! Super admin is ready to use.\n');

  console.log('⚠️  SECURITY REMINDER: Change the password after first login!\n');
}

main()
  .catch((e) => {
    console.error('❌ Verification failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

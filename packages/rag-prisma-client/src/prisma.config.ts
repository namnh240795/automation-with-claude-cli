import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './schema.prisma',
  datasource: {
    url: env('DATABASE_URL') || 'postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db',
  },
});

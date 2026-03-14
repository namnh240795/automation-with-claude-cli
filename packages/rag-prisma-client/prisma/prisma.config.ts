import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: './schema.prisma',
  datasource: {
    url: 'postgresql://postgres:postgres_root_password_change_this@localhost:5432/rag_db?schema=public',
  },
});

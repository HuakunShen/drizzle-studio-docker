import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const url = process.env.DATABASE_URL;

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: { url },
});

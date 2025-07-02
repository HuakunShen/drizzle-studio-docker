import { defineConfig } from "drizzle-kit";
import { parse } from "pg-connection-string";
import { z } from "zod/v4";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
const url = process.env.DATABASE_URL;
const connectionConfig = parse(url);
const rejectUnauthorized = z
  .string()
  .default("true")
  .transform((val) => val === "true")
  .parse(process.env.SSL_REJECT_UNAUTHORIZED);
console.table({ ...connectionConfig, rejectUnauthorized });

const ssl = {
  rejectUnauthorized,
};

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    host: z.string().parse(connectionConfig.host),
    port: z.coerce.number().parse(connectionConfig.port),
    user: z.string().parse(connectionConfig.user),
    password: z.string().parse(connectionConfig.password),
    database: z.string().parse(connectionConfig.database),
    ssl,
  },
});

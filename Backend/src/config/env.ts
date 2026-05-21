import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  BACKEND_PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z
    .string()
    .min(1)
    .refine((url) => url.startsWith("postgresql://") || url.startsWith("postgres://"), {
      message: "DATABASE_URL must be a PostgreSQL connection string because Prisma is configured with provider = \"postgresql\"",
    }),
  JWT_ACCESS_SECRET: z.string().min(24).default("development-access-secret-change-me"),
  JWT_REFRESH_SECRET: z.string().min(24).default("development-refresh-secret-change-me"),
  JWT_ACCESS_TTL: z.string().default("15m"),
  JWT_REFRESH_TTL_DAYS: z.coerce.number().int().positive().default(30),
  CLIENT_ORIGIN: z.string().default("http://localhost:3000"),
  COOKIE_DOMAIN: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  MAX_UPLOAD_MB: z.coerce.number().int().positive().default(5),
});

export const env = envSchema.parse(process.env);

const configuredClientOrigins = env.CLIENT_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const localDevOriginPattern = /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/;

export function isAllowedClientOrigin(origin?: string) {
  if (!origin) return true;
  if (configuredClientOrigins.includes(origin)) return true;
  return env.NODE_ENV === "development" && localDevOriginPattern.test(origin);
}

if (
  env.NODE_ENV === "production" &&
  (env.JWT_ACCESS_SECRET.includes("change-me") ||
    env.JWT_REFRESH_SECRET.includes("change-me") ||
    env.JWT_ACCESS_SECRET.includes("replace-with") ||
    env.JWT_REFRESH_SECRET.includes("replace-with"))
) {
  throw new Error("Production JWT secrets must be configured with strong random values.");
}

export const isProduction = env.NODE_ENV === "production";

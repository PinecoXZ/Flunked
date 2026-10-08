export interface EnvConfig {
  NEXT_PUBLIC_BASE_URL: string;
  NODE_ENV: "development" | "production" | "test";
}

function getEnv(): EnvConfig {
  if (process.env.VERCEL_ENV === "production" && !process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL must be defined in production.");
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flunked.online";
  const nodeEnv = (process.env.NODE_ENV || "development") as EnvConfig["NODE_ENV"];

  return {
    NEXT_PUBLIC_BASE_URL: baseUrl.replace(/\/$/, ""),
    NODE_ENV: nodeEnv,
  };
}

export const env = getEnv();

export interface EnvConfig {
  NEXT_PUBLIC_BASE_URL: string;
  NODE_ENV: "development" | "production" | "test";
}

function getEnv(): EnvConfig {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://flunked.fun";
  const nodeEnv = (process.env.NODE_ENV || "development") as EnvConfig["NODE_ENV"];

  return {
    NEXT_PUBLIC_BASE_URL: baseUrl.replace(/\/$/, ""),
    NODE_ENV: nodeEnv,
  };
}

export const env = getEnv();

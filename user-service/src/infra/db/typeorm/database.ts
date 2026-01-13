import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath = path.join(__dirname, "entities/**/*.{ts,js}");
  const migrationPath = path.join(__dirname, "migrations/**/*.{ts,js}");

  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) throw new Error("Missing env var: DATABASE_URL");

  return {
    type: "postgres",
    url: dbUrl,
    logging: false,
    entities: [entitiesPath],
    migrations: [migrationPath],
    migrationsRun: nodeEnv === "production",
    synchronize: false,
    extra:
      nodeEnv === "production"
        ? {
            max: 20,
            min: 4,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
          }
        : undefined,
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());

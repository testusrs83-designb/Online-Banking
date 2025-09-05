import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./src/db";
import * as schema from "./src/schema";

async function runMigrations() {
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log("Migrations complete");
}

runMigrations().catch(console.error);

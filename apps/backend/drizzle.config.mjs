import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./dist/db.js";
import * as schema from "./dist/schema.js";

async function runMigrations() {
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log("Migrations complete");
}

runMigrations().catch(console.error);

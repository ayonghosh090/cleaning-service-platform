import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const databaseUrl = process.env.DATABASE_URL || "file:./data/anik-ghosh.sqlite";
const databaseFile = databaseUrl.startsWith("file:") ? databaseUrl.slice(5) : databaseUrl;
const absolutePath = path.resolve(/* turbopackIgnore: true */ process.cwd(), databaseFile);

fs.mkdirSync(path.dirname(absolutePath), { recursive: true });

const globalDatabase = globalThis as typeof globalThis & { __anikDatabase?: Database.Database };
export const db = globalDatabase.__anikDatabase ?? new Database(absolutePath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    address TEXT NOT NULL DEFAULT '',
    photo TEXT NOT NULL DEFAULT '',
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service TEXT NOT NULL,
    booking_date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'requested',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);
`);

if (process.env.NODE_ENV !== "production") globalDatabase.__anikDatabase = db;

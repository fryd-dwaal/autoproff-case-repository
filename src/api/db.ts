// db.ts
import Dexie, { Table } from "dexie";
import { User } from "~/types/user";

export class DatabaseInstance extends Dexie {
  users!: Table<User>;
  constructor() {
    super("employeeDatabase");
    this.version(1).stores({
      users: "++id, email",
    });
  }
}

export const db = new DatabaseInstance();

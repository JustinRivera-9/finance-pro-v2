import sql from "better-sqlite3";

const db = sql("planned");

export const getPlannedCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM categories").all();
};

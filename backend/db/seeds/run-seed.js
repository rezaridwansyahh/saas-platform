const seed = require("./seed");
const db = require("../connection");

seed()
  .then(() => {
    console.log("Seed run complete. Closing DB connection...");
    return db.end();
  })
  .catch((err) => {
    console.error("Seed run failed:", err.message);
    db.end();
  });

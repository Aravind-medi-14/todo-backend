const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// MySQL Connection using .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database", err);
    return;
  }
  console.log("Database connected successfully");
});

app.get("/", (req, res) => {
  console.log("Default route");
  db.query("select * from todoItems", (err, result) => {
    if (err) {
      console.log("error occured", err);
    }
    console.log("Data: ", result);
    res.send(result);
  });
});

app.post("/add-item", (req, res) => {
  console.log(req.body);
  db.query(
    `insert into todoItems(itemDescription) values('${req.body.text}');`,
    (err) => {
      if (err) {
        console.log("Error occured", err);
        return;
      }
      console.log("created successfully");
    }
  );
  res.send("added successfully!");
});

app.put("/edit-item", (req, res) => {
  console.log("line 52:", req.body);
  db.query(
    `update todoItems set itemDescription='${req.body.itemDescription}' where ID=${req.body.ID};`,
    (err) => {
      if (err) {
        console.log("Error occured", err);
        return;
      }
      console.log("created successfully");
    }
  );
  res.send("Updated successfully!");
});

app.delete("/delete-item", (req, res) => {
  console.log("line 52:", req.body);
  db.query(`delete from todoItems where ID=${req.body.ID};`, (err) => {
    if (err) {
      console.log("Error occured", err);
      return;
    }
    console.log("deleted successfully");
  });
  res.send("deleted row successfully!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

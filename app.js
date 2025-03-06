require("dotenv").config();
const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");
const messagesRouter = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/messages", messagesRouter);
app.get("*", (req, res) => {
  res.status(404).render("pages/error", {
    title: "Not Found",
    errorMessage: "404 Not Found :C",
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("pages/error", {
    title: "Error",
    errorMessage: "Internal Server Error",
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

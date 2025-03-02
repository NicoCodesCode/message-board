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

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

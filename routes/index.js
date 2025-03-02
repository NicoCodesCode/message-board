const { Router } = require("express");
const messages = require("../messagesData");

const router = Router();

router.get("/", (req, res) => {
  res.render("pages/index", { title: "Home", messages });
});

module.exports = router;

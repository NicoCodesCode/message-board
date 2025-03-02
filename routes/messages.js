const { Router } = require("express");
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const messages = require("../messagesData");

const router = Router();

router.get("/new", (req, res) => {
  res.render("pages/form", { title: "New Message" });
});

router.post("/new", (req, res) => {
  const { messageTitle, messageText, authorName } = req.body;

  messages.unshift({
    id: uuidv4(),
    title: messageTitle,
    text: messageText,
    user: authorName,
    added: format(new Date(), "yyyy-MM-dd"),
  });

  res.redirect("/");
});

router.get("/:messageId", (req, res) => {
  const { messageId } = req.params;
  const message = messages.find((msg) => msg.id === messageId);

  if (!message) {
    res.status(404).render("pages/404", { title: "Not Found" });
  }

  res.render("pages/message", {
    title: `Message from ${message.user}`,
    message,
  });
});

module.exports = router;

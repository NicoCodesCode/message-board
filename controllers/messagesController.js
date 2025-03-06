const db = require("../db/queries");
const { format } = require("date-fns");
const { validateMessage } = require("../validations/messagesValidator");
const { validationResult } = require("express-validator");

exports.getMessagesList = async (req, res) => {
  const messages = await db.getAllMessages();

  res.render("pages/index", {
    title: "Home",
    messages: messages.map((message) => ({
      ...message,
      added: format(message.added, "yyyy-MM-dd"),
    })),
  });
};

exports.getNewMessageForm = (req, res) => {
  res.render("pages/form", { title: "New Message", messageInfo: {} });
};

exports.createNewMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("pages/form", {
        title: "New Message",
        messageInfo: req.body,
        errors: errors.array(),
      });
    }

    const { messageTitle, messageText, authorName } = req.body;
    await db.addMessage(messageTitle, messageText, authorName);

    res.redirect("/");
  },
];

exports.getMessageById = async (req, res) => {
  const { messageId } = req.params;
  const message = await db.getMessageById(messageId);

  if (!message) {
    res.status(404).render("pages/404", { title: "Not Found" });
  }

  res.render("pages/message", {
    title: `Message from ${message.user}`,
    message: { ...message, added: format(message.added, "yyyy-MM-dd") },
  });
};

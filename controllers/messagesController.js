const db = require("../db/queries");
const { format } = require("date-fns");
const { validateMessage } = require("../validations/messagesValidator");
const { validationResult } = require("express-validator");

exports.getMessagesList = async (req, res, next) => {
  try {
    const messages = await db.getAllMessages();

    res.render("pages/index", {
      title: "Home",
      messages: messages.map((message) => ({
        ...message,
        added: format(message.added, "yyyy-MM-dd"),
      })),
    });
  } catch (err) {
    next(err);
  }
};

exports.getNewMessageForm = (req, res) => {
  res.render("pages/form", { title: "New Message", messageInfo: {} });
};

exports.createNewMessage = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("pages/form", {
        title: "New Message",
        messageInfo: req.body,
        errors: errors.array(),
      });
    }

    try {
      const { messageTitle, messageText, authorName } = req.body;
      await db.addMessage(messageTitle, messageText, authorName);

      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];

exports.getMessageById = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await db.getMessageById(messageId);

    if (!message) throw new Error();

    res.render("pages/message", {
      title: `Message from ${message.user}`,
      message: { ...message, added: format(message.added, "yyyy-MM-dd") },
    });
  } catch (err) {
    res.redirect("*");
  }
};

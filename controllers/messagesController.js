const messagesStorage = require("../storages/messagesStorage");
const { validateMessage } = require("../validations/messagesValidator");
const { validationResult } = require("express-validator");

exports.getMessagesList = (req, res) => {
  res.render("pages/index", {
    title: "Home",
    messages: messagesStorage.getAllMessages(),
  });
};

exports.getNewMessageForm = (req, res) => {
  res.render("pages/form", { title: "New Message", messageInfo: {} });
};

exports.createNewMessage = [
  validateMessage,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("pages/form", {
        title: "New Message",
        messageInfo: req.body,
        errors: errors.array(),
      });
    }

    const { messageTitle, messageText, authorName } = req.body;

    messagesStorage.addMessage(messageTitle, messageText, authorName);

    res.redirect("/");
  },
];

exports.getMessageById = (req, res) => {
  const { messageId } = req.params;
  const message = messagesStorage.findMessageById(messageId);

  if (!message) {
    res.status(404).render("pages/404", { title: "Not Found" });
  }

  res.render("pages/message", {
    title: `Message from ${message.user}`,
    message,
  });
};

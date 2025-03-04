const messagesStorage = require("../storages/messagesStorage");

exports.getMessagesList = (req, res) => {
  res.render("pages/index", {
    title: "Home",
    messages: messagesStorage.getAllMessages(),
  });
};

exports.getNewMessageForm = (req, res) => {
  res.render("pages/form", { title: "New Message" });
};

exports.createNewMessage = (req, res) => {
  const { messageTitle, messageText, authorName } = req.body;

  messagesStorage.addMessage(messageTitle, messageText, authorName);

  res.redirect("/");
};

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

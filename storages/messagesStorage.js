const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

class MessagesStorage {
  constructor() {
    this.storage = [
      {
        id: uuidv4(),
        title: "Good morning",
        text: "Hi there!",
        user: "Amando",
        added: "2025-02-03",
      },
      {
        id: uuidv4(),
        title: "Just testing this out...",
        text: "Hello World!",
        user: "Charles",
        added: "2025-01-03",
      },
    ];
  }

  getAllMessages = () => {
    return this.storage;
  };

  addMessage = (messageTitle, messageText, authorName) => {
    this.storage.unshift({
      id: uuidv4(),
      title: messageTitle,
      text: messageText,
      user: authorName,
      added: format(new Date(), "yyyy-MM-dd"),
    });
  };

  findMessageById = (messageId) => {
    return this.storage.find((msg) => msg.id === messageId);
  };
}

module.exports = new MessagesStorage();

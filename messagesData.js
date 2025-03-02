const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

const messages = [
  {
    id: uuidv4(),
    title: "Good morning",
    text: "Hi there!",
    user: "Amando",
    added: format(new Date(), "yyyy-MM-dd"),
  },
  {
    id: uuidv4(),
    title: "Just testing this out...",
    text: "Hello World!",
    user: "Charles",
    added: format(new Date(), "yyyy-MM-dd"),
  },
];

module.exports = messages;

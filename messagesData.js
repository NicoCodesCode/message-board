const { format } = require("date-fns");

const messages = [
  {
    id: 1,
    title: "Good morning",
    text: "Hi there!",
    user: "Amando",
    added: format(new Date(), "yyyy-MM-dd"),
  },
  {
    id: 2,
    title: "Just testing this out...",
    text: "Hello World!",
    user: "Charles",
    added: format(new Date(), "yyyy-MM-dd"),
  },
];

module.exports = messages;

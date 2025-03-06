const pool = require("./pool");

exports.getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC"
  );
  return rows;
};

exports.addMessage = async (messageTitle, messageText, authorName) => {
  await pool.query(
    'INSERT INTO messages (title, text, "user", added) VALUES ($1, $2, $3, NOW())',
    [messageTitle, messageText, authorName]
  );
};

exports.getMessageById = async (messageId) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    messageId,
  ]);
  return rows[0];
};

const { Router } = require("express");
const messagesController = require("../controllers/messagesController");

const router = Router();

router.get("/new", messagesController.getNewMessageForm);
router.post("/new", messagesController.createNewMessage);

router.get("/:messageId", messagesController.getMessageById);

module.exports = router;

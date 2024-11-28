let MessageModel = require("../models/MessageModel");

exports.addMessage =function (req, res, next) {
  let newMessage = req.body;
  let message = new MessageModel(newMessage);
  message
    .save()
    .then((data) => {
      res.status(201).json({message:"Message send successfully", data:data})
    })
    .catch((err) => {
      res.json({ err: err });
    });
};
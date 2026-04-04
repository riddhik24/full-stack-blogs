import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import uploadImage from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socket.js";
import { handleResponse } from "./user.controller.js";

export const getUserForSlider = async (req, res, next) => {
  try {
    const loggedInUser = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password",
    );

    return handleResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (messages.length === 0)
      return handleResponse(res, 200, "No messages found", messages);

    return handleResponse(res, 200, "Messages fetched", messages);
  } catch (err) {
    next(err);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      imageUrl = uploadImage(image);
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId)
      io.to(receiverSocketId).emit("newMessages", newMessage);

    return handleResponse(res, 200, "Message sent", newMessage);
  } catch (err) {
    next(err);
  }
};

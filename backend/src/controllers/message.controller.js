import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  const loggedInUser = req.user;
  try {
    const users = await User.find({ _id: { $ne: loggedInUser._id } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const sender = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: sender, receiverId: userToChat },
        { senderId: userToChat, receiverId: sender }
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Messages: " + error.message });
  }
};

export const sendMessage = async (req, res) => {

    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
    
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
          io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json(newMessage);
        
    } catch (error) {
        res.status(500).json({message: "Error Sending Message: " + error.message})
    }
};
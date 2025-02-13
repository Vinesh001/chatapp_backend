import { Conversation } from "../models/conversationModel.js";
import {Message} from "../models/messageModel.js";

export const sendMessage = async(req, res)=>{
    try{
        const senderId = req.id;
        // console.log(senderId);
        const recieverId = req.params.id;
        // console.log(recieverId);
        const {message} = req.body;

        let gotConversation = await Conversation.findOne({
            participants:{$all: [senderId, recieverId]},
        })

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId, recieverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            recieverId,
            message,
        })

        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }

        await gotConversation.save(); 

        return res.status(201).json({
            message:"Message sent successfully!"
        })

    }catch(error){
        console.log(error);
    }
}

export const getMessage = async(req, res)=>{
    try{
        const senderId = req.id;
        const recieverId = req.params.id;
        // console.log("participants")
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId, recieverId]}
        }).populate("messages")


        return res.status(201).json({
            messages:conversation.messages
        })
    }catch(error){
        console.log(error);
    }
}

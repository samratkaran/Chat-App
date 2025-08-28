import conversation from "../Models/conversationModel.js";
import myMessage from "../Models/messageModel.js";

export const sendMessage = async (req, res)=>{
    try {
        const {message} = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let chats = await conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if(!chats){
            chats = await conversation.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage = new myMessage({
            senderId,
            receiverId,
            message,
            conversationId:chats._id
        })
       if(!newMessage){
        chats.messages.push(newMessage._id);
       }

        await Promise.all([chats.save(), newMessage.save()])

        res.status(201).send(newMessage)
        
    } catch (error) {
        console.log(`error in sendMessage ${error.message}`);
    }
} 
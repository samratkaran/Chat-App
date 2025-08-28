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
                participants:[senderId,receiverId],
                message:[]
            })
        }
        const newMessage = new myMessage({
            senderId,
            receiverId,
            message,
            conversationId:chats._id
        })
     chats.messages.push(newMessage._id);

        await Promise.all([chats.save(), newMessage.save()])

        res.status(201).send(newMessage)
        
    } catch (error) {
        console.log(`error in sendMessage ${error.message}`);
    }
} 

export const getMessage = async (req, res)=>{
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const chats = await conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages");
        // if(!chats) return res.status(200).send([])
            const message = chats.messages;
        res.status(200).send(message)
    } catch (error) {
         console.log(`error in getMessage ${error.message}`);
    }
}
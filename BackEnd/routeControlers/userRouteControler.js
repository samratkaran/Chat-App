import conversation from "../Models/conversationModel.js"
import User from "../Models/userModels.js"

export const getUserBySearch = async (req, res) => {
    try {
        const search = req.query.search || ''
        const currentUserId = req.user._id
        const user  = await User.find({
            $and:[  
                {
                    $or:[
                        {username:{$regex:'.*'+search+'.*',$options:'i'}},
                        {fullname:{$regex:'.*'+search+'.*',$options:'i'}}
                    ]
                },{
                    _id:{$ne:currentUserId}
                }
            ]
        }).select('-password').select('email')

        res.status(200).send(user)
        
    } catch (error) {
        res.status(500).send({success:false,message: error} )
        console.log('error in userRouteControler and getUserBySearch' ,error)
    }
}

// export const currentChat = async (req ,res) =>{
//     try {
//           const currentUserId = req.user._id
//           const currentChaterrs = await conversation.find({
//             participants: currentUserId
//           }).sort({
//             updatedAt: -1
//           })
//           if(!currentChaterrs || currentChaterrs.length === 0) return res.status(200).send([])

//             const participantsId = currentChaterrs.reduce((ids,conversation)=>{
//                 const otherParticipants = conversation.participants.filter(id => id.toString() !== currentUserId.toString());
//                 return [...ids, otherParticipants]
//             },[])
//                console.log("Other Participants IDs:", participantsId);
//             const otherParticipantsId = participantsId.filter(id=> id.toString() !== currentUserId.toString())
//             console.log(otherParticipantsId)

//             const user  = await User.find({_id:{$in:otherParticipantsId}}).select('-password').select('-email');

//             const users = otherParticipantsId.map(id => user.find(user=> user._id.toString() === id.toString()))

//             res.status(200).send(users)

//     } catch (error) {
//         res.status(500).send({success:false,message: error} )
//         console.log('error in userRouteControler and currentChat' ,error)
//     }
// }

export const currentChat = async (req, res) => {
    try {
        const currentUserId = req.user._id;

        const currentChaterrs = await conversation.find({
            participants: currentUserId
        }).sort({ updatedAt: -1 });

        if (!currentChaterrs || currentChaterrs.length === 0) {
            return res.status(200).send([]);
        }

        // Collect all other participants (excluding current user)
        const participantsId = currentChaterrs.reduce((ids, conversation) => {
            const otherParticipants = conversation.participants.filter(
                id => id.toString() !== currentUserId.toString()
            );
            return [...ids, ...otherParticipants]; // flatten
        }, []);

        console.log("Other Participants IDs:", participantsId);

        const users = await User.find({ _id: { $in: participantsId } })
            .select("-password -email");

        res.status(200).send(users);

    } catch (error) {
        console.log("error in userRouteControler and currentChat", error);
        res.status(500).send({ success: false, message: error.message });
    }
};

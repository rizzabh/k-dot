import mongoose from "mongoose";
import chats from "../data/data";
const messageModalSchema = mongoose.Schema({
    
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
},
{
    timestamps: true,
}
);

const Message = mongoose.model("Message", messageModalSchema);
export default Message;

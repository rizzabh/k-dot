const express = require('express');
const chats = require('./data/data')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoute')
dotenv.config();

connectDB();
const app = express();
app.use(cors())
app.get('/',(req, res)=>{
    res.send('Hello World')
})
app.get('/api/chat',(req, res)=>{
    res.send(chats)
})
app.get('/api/chat/:id',(req, res)=>{
    const chat = chats.find((c)=> c._id === req.params.id)
    res.send(chat)
})

app.use('api/user',userRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT,(req,res)=>{
    console.log('Server is running on port 5000')
})
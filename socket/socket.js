import {Server} from 'socket.io'
import express from 'express'
import http from 'http'

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        methods:['POST', 'GET', 'PUT', 'DELETE'],
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on('connection', (socket)=>{
    const userId = socket.handshake.query.userId
    console.log("userId", userId)
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 

    socket.on('disconnect', ()=>{
        delete userSocketMap[userId];
    })
})

export {app, server, io};
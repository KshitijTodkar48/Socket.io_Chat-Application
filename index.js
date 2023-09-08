import express from "express" ;
import path from "path" ;
import { createServer } from "node:http" ;
import { fileURLToPath } from "url" ;
import { Server } from "socket.io" ;
const app = express() ;
const server = createServer(app) ;
const io = new Server(server) ;
const PORT = 3000 ;

// To get around with the ES6 module system
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the current directory name

app.get("/", (req , res) => {
    res.sendFile(path.join(__dirname, 'index.html')) ;
})

io.on("connection" , (socket) => {
    socket.on("chat message" , (msg) => {
        io.emit("chat message", msg) ;
    });
})

server.listen(PORT , () => {
    console.log(`Server started at PORT : ${PORT}`) ;
})
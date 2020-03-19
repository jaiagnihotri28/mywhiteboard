const express = require('express')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
app.use(express.static("public"))

io.on('connection',function(socket){
    socket.on("message",function(message){
        socket.broadcast.emit("broadcast",message);
        console.log(message);
    })

    socket.on("color",function(color){
    
        socket.broadcast.emit("colorchange",color);
    })

    socket.on("mousedown",function(points){
        socket.broadcast.emit("onmousedown",points);
    })

    socket.on("mousemove",function(points){
        socket.broadcast.emit("onmousemove",points);
    })

    socket.on("mouseup",function(points){
        socket.broadcast.emit("onmouseup");
    })

    socket.on("click",function(undoStack,redoStack){
        socket.broadcast.emit("onundo",undoStack,redoStack);
    })



    // socket.on("mousedown",function(){

    // })
})
const port = process.env.PORT||3000

server.listen(port,function(req,res){
    console.log("server is listening 3000")
})
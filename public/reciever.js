socket.on("colorchange",function(color){
    ctx.strokeStyle = color;
    

})

socket.on("onmousedown",function(points){

    ctx.beginPath();
    // let x = e.clientX;
    // let y = e.clientY- board.getBoundingClientRect().y
     points = {
        x:x,
        y:y,
        color:ctx.strokeStyle,
        width:ctx.lineWidth,
        type:"start"
    }
    ctx.moveTo(x,y);

    undoStack.push(points)
    isMouseDown = true
})

socket.on("onmousemove",function(points){

    if (isMouseDown == true) {
        // let x = e.clientX;
        // let y = e.clientY- board.getBoundingClientRect().y
        
         points = {
            x:x,
            y:y,
            color:ctx.strokeStyle,
            width:ctx.lineWidth,
            type:"end"
        }
        undoStack.push(points)
        //points.push[e.clientX]=e.clientY-board.getBoundingClientRect().y
        ctx.lineTo(e.clientX, e.clientY-board.getBoundingClientRect().y);
        
        ctx.stroke();
    }

})

socket.on("onmouseup",function(){
    isMouseDown = false;

    ctx.closePath();
})

socket.on("onundo",function(undoStack,redoStack){
    redoStack.push(undoStack.pop());
    drawagain();
})
socket.on("colorchange",function(color){
    ctx.strokeStyle = color;
    

})

socket.on("onmousedown",function(points){

    ctx.beginPath();
    // let x = e.clientX;
    // let y = e.clientY- board.getBoundingClientRect().y
 const {x,y}=points;
    ctx.moveTo(x,y);

    undoStack.push(points)
    isMouseDown = true
})

socket.on("onmousemove",function(points){
    
    
    const {x,y}=points;
    ctx.lineTo(x,y);
    
    ctx.stroke();
    undoStack.push(points)
    

})

socket.on("onmouseup",function(){
   
})

socket.on("onundo",function(undoStack,redoStack){
    redoStack.push(undoStack.pop());
    drawagain();
})
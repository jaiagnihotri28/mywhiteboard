let isMouseDown = false;
var undoStack=[]
var redoStack=[];
let redo = document.querySelector(".redo")
let zoomin = document.querySelector(".zoomin")
let zoomout = document.querySelector(".zoomout");
const download = document.querySelector(".download");
const dbutton = document.querySelector(".dbutton");


window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    board.width = window.innerWidth;
    board.height = window.innerHeight;

    // Redraw everything after resizing the window
    drawagain(); 
  }
board.addEventListener("mousedown", function (e) {

    ctx.beginPath();
    let x = e.clientX;
    let y = e.clientY- board.getBoundingClientRect().y
    ctx.moveTo(x,y);
    let points = {
        x:x,
        y:y,
        color:ctx.strokeStyle,
        width:ctx.lineWidth,
        type:"start"
    }
    undoStack.push(points)
    isMouseDown = true

    socket.emit("mousedown",points);
})

board.addEventListener("mousemove", function (e) {
    if (isMouseDown == true) {
        let x = e.clientX;
        let y = e.clientY- board.getBoundingClientRect().y
        
        let points = {
            x:x,
            y:y,
            color:ctx.strokeStyle,
            width:ctx.lineWidth,
            type:"end"
        }
        undoStack.push(points)
        socket.emit("mousemove",points);

        //points.push[e.clientX]=e.clientY-board.getBoundingClientRect().y
        ctx.lineTo(e.clientX, e.clientY-board.getBoundingClientRect().y);
        
        ctx.stroke();
    }
})


board.addEventListener("mouseup", function (e) {
    
    isMouseDown = false;

    ctx.closePath();

    socket.emit("mouseup");
})
let undo = document.querySelector(".undo")
undo.addEventListener("click",function(){
   redoStack.push(undoStack.pop());
    drawagain();
    socket.emit("click",undoStack,redoStack);
    
})

redo.addEventListener("click",function(){
    undoStack.push(redoStack.pop());
    drawagain();
})

zoomin.addEventListener("click",function(e){
  ctx.scale(1.1,1.1);
  ctx.translate(-50,-30);
  drawagain();
   
    
    
})

zoomout.addEventListener("click",function(){
    ctx.scale(0.9,0.9);
    ctx.translate(30,20)
    drawagain();
})


function drawagain(){
    ctx.clearRect(0,0,board.width, board.height);
    for(var i in undoStack){
        let {x,y,color,type,width} = undoStack[i];

        if(type=="start"){
            ctx.lineWidth=width;
            ctx.strokeStyle=color;
            ctx.beginPath();
            ctx.moveTo(x,y);
        }else{

            ctx.lineWidth=width;
            ctx.strokeStyle=color;
            ctx.lineTo(x,y);
            ctx.stroke();


        }
    }
}


download.addEventListener("click",function(){
    putImage();
dbutton.click();

})

function putImage()
{
   
    const image = board.toDataURL("image/png");
    // var link = document.createElement('a');
    dbutton.download = "my-image.png";
    dbutton.href = image;
    // link.click();                    

}  

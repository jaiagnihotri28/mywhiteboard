let parent;
let initalX;
let initialY;
let mini;

let isDown = false;
function createSticky(){
    const body = document.querySelector("body");
const textArea = document.createElement("textarea");
const StickyPad = document.createElement("div");
const navbar = document.createElement("div");
const writingPad = document.createElement("div");

 const minimize = document.createElement("div")
 const close = document.createElement("div");

 textArea.setAttribute("class","text-area");

minimize.setAttribute("class","minim");
close.setAttribute("class","closetab")
navbar.setAttribute("class", "navbar")
writingPad.setAttribute("class", "writingPad")
StickyPad.setAttribute("class", "sticky-pad")



writingPad.appendChild(textArea);
navbar.appendChild(minimize);
navbar.appendChild(close);
StickyPad.appendChild(navbar);
StickyPad.appendChild(writingPad);

//body.appendChild(navbar)
body.appendChild(StickyPad);

parent= StickyPad;



close.addEventListener("click",function(e){
    StickyPad.remove();
})

minimize.addEventListener("click",function(e){
    if(mini==true){
        textArea.style.display="block";
        mini=false;

    }else{
        mini=true;
        textArea.style.display="none"

    }
})
eventhandler();
}

function eventhandler(){

//const ctxx = StickyPad.getContext("2d");

parent.addEventListener("mousedown",function(e){
    isDown = true;
     initialX = e.clientX;
    intialY = e.clientY;
    //ctxx.beginpath();
   
    
})

parent.addEventListener("mousemove",function(e){
    if(!isDown){
        return;
    }

    let finalX = e.clientX;
    let finalY = e.clientY;
    let diffX = finalX-initialX;
    let diffY = finalY-intialY;

    const {x,y} = parent.getBoundingClientRect();
    
    parent.style.top=y+ diffY + "px"
    parent.style.left=x+ diffX + "px"
}
)

parent.addEventListener("mouseup",function(e){
    isDown=false;
})

parent.addEventListener("mouseleave",function(e){
    isDown=false;
})


}

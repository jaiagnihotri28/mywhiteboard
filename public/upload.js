const imageupload = document.querySelector(".image-upload");
imageupload.classList.add("hidden")
const body=document.querySelector("body");
var imgisDown = false;
var initialXcord;
var intialYcord;
const imgPicker = document.getElementsByClassName("imagepicker");
console.log(imgPicker)
imgPicker[0].addEventListener("click",function(e){
    
    imageupload.click();
})


imageupload.addEventListener("change",function(e){
    const imgdiv = document.createElement("div");
   
    


    var img = document.createElement("img");
    imgdiv.setAttribute("class","imglink");
    img.setAttribute("class","imglinksmall");


         
    const imgdata = imageupload.files[0];
   img.src = URL.createObjectURL(imgdata)
    
   
    // imgdiv.appendChild(img);
    imgdiv.appendChild(img);
    body.appendChild(imgdiv);
    imgdiv.addEventListener("mousedown",function(){
        imgisDown=true;
        initialXcord = e.clientX;
    intialYcord = e.clientY;

    })

    imgdiv.addEventListener("mousemove",function(){

        if(!imgisDown){
            return;
        }
    
        let finalXcord = e.clientX;
        let finalYcord = e.clientY;
        let diffXcord = finalXcord-initialXcord;
        let diffYcord = finalYcord-intialYcord;

        const {x,y} = imgdiv.getBoundingClientRect();
    
        imgdiv.style.top=y+ diffYcord + "px"
        imgdiv.style.left=x+ diffXcord + "px"
        finalXcord=initialXcord;
        finalYcord=initialYcord;
    

    })

    imgdiv.addEventListener("mouseup",function(e){
        imgisDown=false;
    })
    

})
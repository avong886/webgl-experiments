
    var xLocation=0;
var yLocation=0;
var zLocation=0;
var jumpSpeed = 0;
    var spartanspeed = 0;
var spartanspeed2 = 0;

     var initialX=0;
var initialY=0;
var canvas1,
c, // c is the canvas' context 2D
container;
setupCanvas();

var mouseX, mouseY, 
// is this running in a touch capable environment?
touchable = 'createTouch' in document,
touches = []; // array of touch vectors

setInterval(draw, 1000/35); 
if(touchable) {
canvas1.addEventListener( 'touchstart', onTouchStart, false );
canvas1.addEventListener( 'touchmove', onTouchMove, false );
canvas1.addEventListener( 'touchend', onTouchEnd, false );
window.onorientationchange = resetCanvas; 
window.onresize = resetCanvas; 
} else {

canvas1.addEventListener( 'mousemove', onMouseMove, false );
}

function resetCanvas (e) { 
// resize the canvas - but remember - this clears the canvas too. 
canvas1.width = window.innerWidth; 
canvas1.height = window.innerHeight;

//make sure we scroll to the top left. 
window.scrollTo(0,0); 
}

function draw() {



c.clearRect(0,0,canvas1.width, canvas1.height); 
spartanspeed=0;
spartanspeed2=0;


//xLocation += 0.01;
if(touches[0])
{
if (touches[0].clientX<380)
{
spartanspeed =(touches[0].clientX-initialX)*0.001;

spartanspeed2 =(touches[0].clientY-initialY)*0.001;
}
if (touches[0].clientX >= 380)
{
    jumpSpeed = 1;
}






}
if(touchable) {

for(var i=0; i<touches.length; i++)
{
var touch = touches[i]; 
c.beginPath(); 
c.fillStyle = "white";
c.fillText("touch id : "+touch.identifier+ "touch X: " + initialX+" x:"+touch.clientX+" y:"+touch.clientY, touch.clientX+30, touch.clientY-30); 

c.fillText(touches[i].clientX-initialX, 250,250);
if(touches[i].clientX < 380)
{
c.beginPath(); 
c.strokeStyle = "orange";
c.lineWidth = "6";
c.arc(touch.clientX, touch.clientY, 40, 0, Math.PI*2, true); 
c.stroke();

c.beginPath(); 
c.strokeStyle = "orange";
c.lineWidth = "3";
c.arc(initialX, initialY, 40, 0, Math.PI*2, true); 
c.stroke();

c.beginPath(); 
c.strokeStyle = "orange";
c.lineWidth = "6";
c.arc(initialX, initialY, 60, 0, Math.PI*2, true); 
c.stroke();
}
else
{
c.beginPath(); 
c.strokeStyle = "white";
c.lineWidth = "6";
c.arc(touch.clientX, touch.clientY, 40, 0, Math.PI*2, true); 
c.stroke();
}

}

} else {

c.fillStyle	= "white"; 
c.fillText("mouse : "+xLocation+", "+mouseY, mouseX, mouseY); 

}



}


//After the rendering, the touch handling

function onTouchStart(e) {

touches = e.touches; 


for(var i=0; i<touches.length; i++)
{
if(touches[i].clientX < 380)
{
initialX=200;
initialY=350;
}


}
}

function onTouchMove(e) {
// Prevent the browser from doing its default thing (scroll, zoom)
e.preventDefault();
touches = e.touches; 

} 

function onTouchEnd(e) { 

touches = e.touches; 

}

function onMouseMove(event) {

mouseX = event.offsetX;
mouseY = event.offsetY;
}


function setupCanvas() {

canvas1 = document.createElement( 'canvas' );
c = canvas1.getContext( '2d' );
var att = document.createAttribute("id");  
att.value ="canvas3";
canvas1.setAttributeNode(att);

container = document.createElement( 'div' );
container.className = "container";

canvas1.width = window.innerWidth; 
canvas1.height = window.innerHeight; 

document.body.appendChild( container );
container.appendChild(canvas1);	

c.strokeStyle = "#ffffff";
c.lineWidth =2;	
}

    

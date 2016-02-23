 var initialX=0;
var initialY=0;
var canvas,
c, // c is the canvas' context 2D
container;
setupCanvas();

var mouseX, mouseY, 
// is this running in a touch capable environment?
touchable = 'createTouch' in document,
touches = []; // array of touch vectors

setInterval(draw, 1000/35); 
if(touchable) {
canvas.addEventListener( 'touchstart', onTouchStart, false );
canvas.addEventListener( 'touchmove', onTouchMove, false );
canvas.addEventListener( 'touchend', onTouchEnd, false );
window.onorientationchange = resetCanvas; 
window.onresize = resetCanvas; 
} else {

canvas.addEventListener( 'mousemove', onMouseMove, false );
}

function resetCanvas (e) { 
// resize the canvas - but remember - this clears the canvas too. 
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;

//make sure we scroll to the top left. 
window.scrollTo(0,0); 
}

function draw() {



c.clearRect(0,0,canvas.width, canvas.height); 
if(touches[0])
{
if (touches[0].clientX<380)
{
xLocation+=(touches[0].clientX-initialX)*0.01;
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
c.fillText("mouse : "+mouseX+", "+mouseY, mouseX, mouseY); 

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

canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 

document.body.appendChild( container );
container.appendChild(canvas1);	

c.strokeStyle = "#ffffff";
c.lineWidth =2;	
}

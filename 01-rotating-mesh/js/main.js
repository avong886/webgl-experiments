var scene, camera, renderer;

// Handle keyboard controls
var keysDown = {};
//var xLocation = 0;
//var spartanspeed = 0;

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;
var radius = .1,
segments = 6,
rings = 6;

blocksize= 1;

map=[
[0,1,0,0,1,0,0,1],
[0,1,0,0,1,0,0,1],
[0,1,0,0,1,0,0,1],
[0,0,0,0,1,0,0,1],
[0,1,0,0,0,0,0,1],
[0,1,0,0,1,0,0,1],
[0,0,1,1,0,0,0,0]];




var sphereMaterial =
new THREE.MeshLambertMaterial(
{
color: 0x33FFCC
});



function init() {
    scene = new THREE.Scene();

    initMesh();
var ball = new THREE.Mesh(
    new THREE.SphereGeometry(radius,
    segments,
    rings),
    sphereMaterial);
scene.add(ball);

var planeMaterial =
new THREE.MeshLambertMaterial(
{
    color: 0x33FFCC
});

var planeMaterial2 =
new THREE.MeshLambertMaterial(
{
    color: 0x996600
});

var blockMaterial =
new THREE.MeshLambertMaterial(
{
    color: 0xd3e1e6
});


//playing surface plane
var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(
    30,	// 95% of table width, since we want to show where the ball goes out-of-bounds
    20,1,1),
    planeMaterial);
//plane.rotation.x= Math.PI/2;
//plane.doubleSided=true;
plane.receiveShadow = true;
plane.castShadow=true;
scene.add(plane);

plane.position.set(1,-2,1);
plane.rotation.set( Math.PI/2,0,0);

plane.material.side = THREE.DoubleSide;


var plane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(
    10,	// 95% of table width, since we want to show where the ball goes out-of-bounds
    5,1,1),
    planeMaterial2);
//plane.rotation.x= Math.PI/2;
//plane.doubleSided=true;
plane2.receiveShadow = true;
plane2.castShadow=true;
scene.add(plane2);

plane2.position.set(-1,-1.5,-1);
plane2.rotation.set( Math.PI/2,0,0);

plane2.material.side = THREE.DoubleSide;

var cube= new THREE.CubeGeometry(blocksize, blocksize*2, blocksize);

for(var i = 0; i < 7; i++)
{
for(var j = 0; j < 8; j++)
{

if(map[i][j]==1)
{

var buildingblock= new THREE.Mesh( cube, blockMaterial);
buildingblock.position.x=j*blocksize;
buildingblock.position.z=i*blocksize;
buildingblock.position.y=0;
buildingblock.castShadow = true;
buildingblock.receiveShadow = true;


scene.add(buildingblock);

}


}


}
    initCamera();


    initLights();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 100);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
}

function initLights() {
   // var light = new THREE.PointLight( 0xffffff, 1, 100 ); 
    //light.position.set( 0, 10, 0 ); 
   // scene.add( light );

//var light2 = new THREE.PointLight( 0xffff66, 1, 100 ); 
   // light2.position.set( 0, 10, 0); 
   // scene.add( light2 );

spotLight = new THREE.DirectionalLight(0xffffff);
spotLight.position.set(0, 30, 0);
spotLight.intensity = 2;
spotLight.castShadow = true;
scene.add(spotLight);

}

var mesh = null;
function initMesh() {
    var loader = new THREE.JSONLoader();
    loader.load('./spartan6.json', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
        mesh.translation = THREE.GeometryUtils.center(geometry);
mesh.castShadow = true;
        scene.add(mesh);
    });
}

function rotateMesh() {
    if (!mesh) {
        return;
    }

    //mesh.rotation.x -= SPEED * 2;
    mesh.rotation.y -= SPEED;
    //mesh.rotation.z -= SPEED * 3;
    //spartanspeed = 0;
//theme1.play();
    if (39 in keysDown)
    {
        spartanspeed = 0.05;
       
        //mesh.__dirtyPosition = true;
        
    }
    if (37 in keysDown)
    {
    	spartanspeed = -0.05;
    	
    }
    if (40 in keysDown)
    {
    	spartanspeed2 = 0.05;
    }
    if (38 in keysDown)
    {
    	spartanspeed2 = -0.05;
    }
    if (32 in keysDown && zLocation < 1)
    {
    	jumpSpeed = 1;
    
    }
    
    if (jumpSpeed > 0)
    {
    	jumpSpeed -= 0.3;
    }

    zLocation += jumpSpeed;
    
    xLocation += spartanspeed;
yLocation += spartanspeed2;
if (zLocation < 0)
{
	zLocation = 0;
	jumpSpeed = 0;
}
     mesh.position.set( xLocation, zLocation ,yLocation );
camera.lookAt(mesh.position);
camera.position.set(mesh.position.x-5, mesh.position.y+5, mesh.position.z+5);
}

function render() {
    requestAnimationFrame(render);
    
    rotateMesh();
    renderer.render(scene, camera);
}

init();
render();

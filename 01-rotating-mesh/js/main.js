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

//playing surface plane
var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(
    30,	// 95% of table width, since we want to show where the ball goes out-of-bounds
    20,1,1),
    planeMaterial);
//plane.rotation.x= Math.PI/2;
//plane.doubleSided=true;

scene.add(plane);

plane.position.set(1,-2,1);
plane.rotation.set( Math.PI/2,0,0);

plane.material.side = THREE.DoubleSide;


var plane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(
    10,	// 95% of table width, since we want to show where the ball goes out-of-bounds
    20,1,1),
    planeMaterial2);
//plane.rotation.x= Math.PI/2;
//plane.doubleSided=true;

scene.add(plane2);

plane2.position.set(-1,-1.5,1);
plane2.rotation.set( Math.PI/2,0,0);

plane2.material.side = THREE.DoubleSide;

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
}

function initLights() {
    var light = new THREE.PointLight( 0xffffff, 5, 100 ); 
    light.position.set( 50, 50, 50 ); 
    scene.add( light );
spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 0, 460);
spotLight.intensity = 1;
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
    if (38 in keysDown)
    {
        spartanspeed = 0.05;
       
        //mesh.__dirtyPosition = true;
        
    }
    if (40 in keysDown)
    {
    	spartanspeed = -0.05;
    	
    }
    xLocation += spartanspeed;
yLocation += spartanspeed2;
     mesh.position.set( xLocation, 0,yLocation );
}

function render() {
    requestAnimationFrame(render);
    
    rotateMesh();
    renderer.render(scene, camera);
}

init();
render();

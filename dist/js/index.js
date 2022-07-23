//git add .
//git commit -m "name of commit"
//git push origin master
//npm run deploy

var initialized = false;
//loading
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    //mmdLoader.createHelper();
};

loadingManager.onLoad = function ( ) {

	console.log( 'Loading complete!');
    console.log('Initializing');   
    for (let i = 0; i < islands.length; i++){
        islands[i].Initialize();
    }

    for (let i = 0; i < decoratives.length; i++){
        decoratives[i].Initialize();
    }
    boat.Initialize();
    initialized = true;
};


loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

loadingManager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

    
const engine = Engine.create();

engine.gravity.y = 0;
const runner = Runner.create();

Runner.run(runner, engine);




//const normalTexture = textureLoader.load('/textures/SmallBricks.jpg')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BoxGeometry(1, 32, 16);

// Lights

//direction light 1
const dirLight1 = new THREE.DirectionalLight(0x404040, 1); // soft white light
dirLight1.intensity = 0.5;
dirLight1.position.set(0,0,-1);
scene.add(dirLight1);

// //direction light 2
// const dirLight2 = new THREE.DirectionalLight(0x404040, 1); // soft white light
// dirLight2.intensity = 3;
// dirLight2.position.set(0,0.8,-0.6);
// scene.add(dirLight2);

//ambient light 1
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
ambientLight.intensity = 3;
scene.add(ambientLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {    
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.rotation.x = 50 * Math.PI/180;
camera.rotation.y = Math.PI;
camera.focus = 20;
scene.add(camera)

function UpdateCameraPos()
{
    camera.position.x = boat.model.position.x;

}

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false
})
renderer.setSize(sizes.width, sizes.height)
//if I set this low I can emulate an old pc effect
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const physicsManager = new PhysicsManager();

const modelLoader = new THREE.FBXLoader(loadingManager);
const texLoader = new THREE.TextureLoader(loadingManager);
const fontLoader = new THREE.FontLoader(loadingManager);

var boat = new Boat(scene, modelLoader, texLoader, engine);
var Uppersea = new Sea(scene, texLoader, 'resources/textures/Sea/WaterBlank.jpg', -0.6, 0.5);
var Lowersea = new Sea(scene, texLoader, 'resources/textures/Sea/WaterBlank.jpg', -1, 1);
 
const islands = [
    new Island(scene, fontLoader, modelLoader, texLoader, engine, boat, new THREE.Vector3(15, -1, -15),
    "resources/textures/Billboards/Billboard_V2_HeadOff.png", 
    "HEAD OFF",
    ['Head off is a small game made to try out making',
     'AI using a behaviourtree.This project was made',
     'for a school assignment, and wasn`t supposed to',
     'have gameplay, but I added a small gameplay loop',
     'nonetheless.'],
     "https://smos-bois.itch.io/head-off"),

     new Island(scene, fontLoader, modelLoader, texLoader, engine, boat, new THREE.Vector3(-15, -1, -15),
      "resources/textures/Billboards/Billboard_V2_KnowhereExpress.png", 
      "Knowhere Express",
     ['Knowhere Express was my submission to the Global',
      'Gamejam of 2022, where I contributed as the only',
      'developer on the team.',
      'You might notice the screenshots are 1 by 1. ',
      'That`s because we wanted to capture a weird feeling,',
      'mixing high detail textures with ps1 esc graphics.'],
      "https://mirnavsteenbergen.itch.io/the-knowhere-express"),
]

const decoratives = [
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/KeyW.fbx', 'resources/textures/KeyW.png', new THREE.Vector3(10,-0.2,0), false, new THREE.Vector3(1,0.4,1), new THREE.Vector3(0,0,0))
]


/**
 * Animate
 */

//variables to move the player
var moveSpeed = 0.0003;
var rotSpeed = 0.02;

var posOffset = 0;
var rotOffset = 0;
var currentlyPressedKey;

//get key input
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;

    if (keyCode == 87 || keyCode == 38) {
        posOffset = moveSpeed;
    }
    if (keyCode == 83 || keyCode == 40) {
        posOffset = -moveSpeed;
    }

    if (keyCode == 65 || keyCode == 37) {
        rotOffset = rotSpeed;
    }

    if (keyCode == 68 || keyCode == 39) {
        rotOffset = -rotSpeed;
    }

    currentlyPressedKey = keyCode;

    for (let i = 0; i < islands.length; i++){
        islands[i].OnButtonDown(event);
    }
};

//input to check wether the player lets go of certain keys to let them stop moving
//I might have to change this to detect stopping movement better
document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
    var keyCode = event.which;

    if (keyCode == 87 || keyCode == 83 || keyCode == 38 || keyCode == 40) {
        posOffset = 0;
    }
    if (keyCode == 68 || keyCode == 39 || keyCode == 65 || keyCode == 37) {
        rotOffset = 0;
    }

    currentlyPressedKey = null;
    for (let i = 0; i < islands.length; i++){
        islands[i].OnButtonUp(event);
    }
}






const clock = new THREE.Clock();

const mouse = new Mouse(camera);

onpointerdown = (event) => {
    mouse.PointerDownEvent();
    boat.PointerDownEvent();
}
onpointermove = (event) => {
    boat.PointerMoveEvent();
    mouse.PointerMoveEvent(event);
}
onpointerup = (event) => {
    mouse.PointerUpEvent();
    boat.PointerUpEvent();
    
}

//this updates frames.
const tick = () => {
    var delta = clock.getDelta();
    console.log(clock.getDelta());

    if(initialized == true){
    physicsManager.Update();
    }
    // Update objects
    boat.Update(posOffset, rotOffset, delta);

    mouse.UpdateCamera();
    boat.UpdateCameraPos(camera, currentlyPressedKey);

    for (let i = 0; i < islands.length; i++){
        islands[i].Update();
    }

    for (let i = 0; i < decoratives.length; i++){
        decoratives[i].Update();
    }

    boat.animate(clock);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick()



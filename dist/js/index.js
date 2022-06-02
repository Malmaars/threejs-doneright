//loading
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

loadingManager.onLoad = function ( ) {

	console.log( 'Loading complete!');

};


loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

loadingManager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};

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
})

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

var boat = new Boat(scene, loadingManager);
var sea = new Sea(scene);

/**
 * Animate
 */

//variables to move the player
var moveSpeed = 0.0003;
var rotSpeed = 0.02;

var posOffset = 0;
var rotOffset = 0;

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
}

const clock = new THREE.Clock()

//this updates frames.
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects

    boat.Update(posOffset, rotOffset);

    boat.UpdateCameraPos(camera);
    boat.animate(clock);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



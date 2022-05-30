//loading
const textureLoader = new THREE.TextureLoader()

//const normalTexture = textureLoader.load('/textures/SmallBricks.jpg')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
var boat = new Boat(scene);
var sea = new Sea(scene);

// Objects
const geometry = new THREE.BoxGeometry(1, 32, 16);

// Lights

//global light
const dirLight1 = new THREE.DirectionalLight(0x404040, 1); // soft white light
dirLight1.intensity = 1;
dirLight1.position.set(0,0,-1);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0x404040, 1); // soft white light
dirLight2.intensity = 1;
dirLight2.position.set(0,0.8,-0.6);
scene.add(dirLight2);

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
ambientLight.intensity = 1;
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

function SetImportDetail(model) {
    model.traverse(function (child) {

        if (child instanceof THREE.Mesh) {

            // access other properties of material
            child.material.metalness = 0;

        }

    });
}

/**
 * Animate
 */

var moveSpeed = 0.0003;
var rotSpeed = 0.02;

var posOffset = 0;
var rotOffset = 0;

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

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects

    boat.Update(posOffset, rotOffset);
    boat.UpdateCameraPos(camera);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



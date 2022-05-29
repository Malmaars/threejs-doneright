
//loading
const textureLoader = new THREE.TextureLoader()

//const normalTexture = textureLoader.load('/textures/SmallBricks.jpg')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
var boat = new Boat(scene);

// Objects
const geometry = new THREE.SphereGeometry(1, 32, 16);

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.2
material.roughness = 0.6
material.wireframe = true
//material.normalMap = normalTexture
material.color = new THREE.Color(0xffffff)

// Lights

//global light
const light = new THREE.AmbientLight(0x404040); // soft white light
light.intensity = 2;
scene.add(light);

const pointLight2 = new THREE.PointLight(0x4176d9, 0.1)
pointLight2.position.set(-2.25, 1.2,4.64)
pointLight2.intensity = 2
scene.add(pointLight2)



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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

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

function SetImportDetail(model)
{
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


const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    boat.Update();
    // Update objects
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



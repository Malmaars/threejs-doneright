import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

//loading
const textureLoader = new THREE.TextureLoader()

//const normalTexture = textureLoader.load('/textures/SmallBricks.jpg')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( 1, 32, 16 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.2
material.roughness = 0.6
material.wireframe = true
//material.normalMap = normalTexture
material.color = new THREE.Color(0xffffff)

const loader = new GLTFLoader();

loader.load( 'resources/SimpleBoat.gltf', function ( gltf ) {

    var boat;
    boat = gltf.scene;
    boat.scale.set(0.1,0.1,0.1);

    boat.traverse( function( child ) {

        if ( child instanceof THREE.Mesh ) {
    
            child.material.metalness = 0;
            // access other properties of material
    
        }
    
    } );

    scene.add( boat );
}, undefined, function ( error ) {


    
console.error( error );

}    );

// Lights

//global light
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
light.intensity = 4;
scene.add( light );


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

/**
 * Animate
 */


const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

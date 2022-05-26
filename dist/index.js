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

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const loader = new GLTFLoader();

loader.load( 'resources/SimpleBoat.gltf', function ( gltf ) {

scene.add( gltf.scene );
gltf.scene.scale.set(0.1,0.1,0.1);
}, undefined, function ( error ) {

console.error( error );

}    );

// Lights

//light 1
/*
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
*/

//light 2
const pointLight2 = new THREE.PointLight(0x4176d9, 0.1)
pointLight2.position.set(-2.25, 1.2,4.64)
pointLight2.intensity = 2
scene.add(pointLight2)

pointLight2.parent = sphere;

//const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.1)
//scene.add(pointLightHelper)

//light 3
const pointLight3 = new THREE.PointLight(0xee3835, 0.1)
pointLight3.position.set(1.13,-2.37,-6)
pointLight3.intensity = 1.6
scene.add(pointLight3)

pointLight3.parent = sphere;

//const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 0.1)
//scene.add(pointLightHelper3)


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

 document.addEventListener('mousemove', onDocumentMouseMove)

 let mouseX = 0
 let mouseY = 0
 let targetX = 0
 let targetY = 0
 
 const windowX = window.innerWidth / 2;
 const windowY = window.innerHeight / 2;
 
 function onDocumentMouseMove(event){
     mouseX = (event.clientX - windowX);
     mouseY = (event.clientY - windowY);
 }
 
 document.addEventListener('mousedown', onDocumentMouseDown);
 document.addEventListener('mouseup', onDocumentMouseUp);
 let mouseOffsetX = 0;
 let mouseOffsetY = 0;
 
 let sphereOffset = new THREE.Vector3(0,0,0)
 
 let holdingMouse = false;
 
 function onDocumentMouseDown(event){
     holdingMouse = true;
     mouseOffsetX = mouseX;
     mouseOffsetY = mouseY;
     sphereOffset = sphere.rotation;
 }
 
 function onDocumentMouseUp(event){
     holdingMouse = false;
 }
 
 function RotateSphere()
 {  
     if(holdingMouse == true)
     {
        //  targetX = (mouseX - mouseOffsetX) * .001
        //  targetY = (mouseY - mouseOffsetY) * .001
 
         targetX = (mouseX - mouseOffsetX) * 0.00001;
         targetY = (mouseY - mouseOffsetY) * 0.00002;

         sphere.rotateOnWorldAxis(new THREE.Vector3(0,1,0), targetX);
         sphere.rotateOnWorldAxis(new THREE.Vector3(1,0,0), targetY);
         
        //  sphere.rotation.y = sphereOffsetY + (targetX) * 2;
        //  sphere.rotation.x = sphereOffsetX + (targetY);
        //  sphere.rotation.z = sphereOffsetX + (targetY);
     }
     else
     {

        targetX *= 0.992;
        targetY *= 0.992;
        sphere.rotateOnWorldAxis(new THREE.Vector3(0,1,0), targetX);
        sphere.rotateOnWorldAxis(new THREE.Vector3(1,0,0), targetY);
     }

 }


const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // Update Orbital Controls
    // controls.update()

    RotateSphere();
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

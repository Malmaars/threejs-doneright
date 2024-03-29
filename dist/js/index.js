//git add .
//git commit -m "name of commit"
//git push origin master
//npm run deploy

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  const onMobile = window.mobileCheck();


  function swapStyleSheet(sheet) {
    document.getElementById("pagestyle").setAttribute("href", sheet);  
}

  var initialized = false;
//loading
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    camera.position.set(0,1000,0);
    //mmdLoader.createHelper();
};

loadingManager.onLoad = function ( ) {

	console.log( 'Loading complete!');

    loadingscreen.OnLoad();
};


loadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	//console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

loadingManager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );
    window.location.reload();
    

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

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const modelLoader = new THREE.FBXLoader(loadingManager);
const texLoader = new THREE.TextureLoader(loadingManager);
const fontLoader = new THREE.FontLoader(loadingManager);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.rotation.x = 50 * Math.PI/180;
camera.rotation.y = Math.PI;
camera.focus = 20;
scene.add(camera)

var mobile;
if(onMobile == true){
    mobile = new Mobile(scene, texLoader, camera);
    swapStyleSheet("stylesheet2.css");
}


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
    alpha: false,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)
//if I set this low I can emulate an old pc effect
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// var renderPass = new THREE.RenderPass( scene, camera );

// var copyPass = new THREE.ShaderPass( THREE.CopyShader );
// copyPass.renderToScreen = true;

// var composer = new THREE.EffectComposer( renderer );
// composer.addPass( renderPass );
// composer.addPass( copyPass );

// var fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
// const size = new THREE.Vector2();
// const pixelRatio = renderer.getPixelRatio();

// size.x = renderer.domElement.clientWidth * pixelRatio;
// size.y = renderer.domElement.clientHeight * pixelRatio;
// var uniforms = fxaaPass.material.uniforms;
// uniforms[ 'resolution' ].value.x = 1 / size.x;
// uniforms[ 'resolution' ].value.y = 1 / size.y;

// composer.addPass( fxaaPass );

const mouse = new Mouse(camera, scene);

// var loadingSea = new Sea(scene, texLoader, 'resources/textures/Sea/WaterBlank.jpg', 850, 0.5);
const loadingscreen = new LoadingScreen(loadingManager, scene, texLoader, modelLoader,fontLoader, mouse, camera);
//var loadingSeaLower = new Sea(scene, texLoader, 'resources/textures/Sea/WaterBlank.jpg', 991.4, 1);



var boat = new Boat(scene, modelLoader, texLoader, engine);
var Uppersea = new Sea(scene, texLoader, 'resources/textures/Sea/WaterBlank.jpg', -0.6, 0.5);
var Lowersea = new Sea(scene, texLoader, 'resources/textures/Sea/WaterBlank.jpg', -1, 1);
 
const islands = [
    new Island(camera ,scene, fontLoader, modelLoader, texLoader, engine, boat, mouse, new THREE.Vector3(-45, -1, -15),
    "resources/textures/Billboards/Billboard_V2_HeadOff.png", 
    "HEAD OFF",
    ['Head off is a small game made to try out making',
     'AI using a behaviourtree.This project was made',
     'for a school assignment, and wasn`t supposed to',
     'have gameplay, but I added a small gameplay loop',
     'nonetheless.'],
     "https://smos-bois.itch.io/head-off"),

     new Island(camera,scene, fontLoader, modelLoader, texLoader, engine, boat, mouse, new THREE.Vector3(-25, -1, -15),
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

var PCdecoratives;
if(onMobile == false){
PCdecoratives = [
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/KeyArrow.fbx', 'resources/textures/KeyArrow.png', new THREE.Vector3(-10.5,-0.2,0), false, new THREE.Vector3(1,0.4,1), new THREE.Vector3(0,0,0), 0,0, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/KeyArrow.fbx', 'resources/textures/KeyArrow.png', new THREE.Vector3(-10.5,-0.2, -1.5), false, new THREE.Vector3(1,0.4,1), new THREE.Vector3(0,0,0), Math.PI,0, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/KeyArrow.fbx', 'resources/textures/KeyArrow.png', new THREE.Vector3(-9,-0.2,-1.5), false, new THREE.Vector3(1,0.4,1), new THREE.Vector3(0,0,0), Math.PI/2,0, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/KeyArrow.fbx', 'resources/textures/KeyArrow.png', new THREE.Vector3(-12,-0.2,-1.5), false, new THREE.Vector3(1,0.4,1), new THREE.Vector3(0,0,0), Math.PI*1.5,0, 1),
];
const PCdecoTexts = [
    new DecoText(scene, 'Use your', fontLoader, new THREE.Vector3(-5,-0.2,-0.5), 200, Math.PI/2, new THREE.Vector3(0,0,100), 5),
    new DecoText(scene, 'keys', fontLoader, new THREE.Vector3(-11.5,-0.2,-0.5), 200, Math.PI/2, new THREE.Vector3(0,0,100), 5),
    new DecoText(scene, 'to move around', fontLoader, new THREE.Vector3(-5.5,-0.2,-3), 200, Math.PI/2, new THREE.Vector3(0,0,100), 5)
];
}

else{
    var MobiledecoTexts = [
        new DecoText(scene, 'Use the controls', fontLoader, new THREE.Vector3(-5,-0.2,-0.5), 200, Math.PI/2, new THREE.Vector3(0,0,100), 5),
        new DecoText(scene, 'to move around', fontLoader, new THREE.Vector3(-5.5,-0.2,-3), 200, Math.PI/2, new THREE.Vector3(0,0,100), 5)
    ]   
}

const permaDecos = [
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/directionBuoy.fbx', 'resources/textures/DirectionBuoy.png', new THREE.Vector3(0,-0.2,-20), true, new THREE.Vector3(1,2,1), new THREE.Vector3(0,0,0), 0,0, 0.5),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/S.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(6.3,-0.1,-5), false, new THREE.Vector3(0.8,2,1.3), new THREE.Vector3(0,0,0),0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/I.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(5.5,-0.1,-5), false, new THREE.Vector3(0.2,2,1.3), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/M.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(4.6,-0.1,-5), false, new THREE.Vector3(1.2,2,1.3), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/O.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(3.5,-0.1,-5), false, new THREE.Vector3(0.6,2,1.3), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/N.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(2.5,-0.1,-5), false, new THREE.Vector3(1,2,1.3), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/D.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(0.5,-0.1,-5), false, new THREE.Vector3(0.5,2,1.3), new THREE.Vector3(0,0,0),0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/E.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(-0.5,-0.1,-5), false, new THREE.Vector3(0.5,2,1), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/B.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(-2.5,-0.1,-5), false, new THREE.Vector3(0.8,2,1), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/R.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(-3.5,-0.1,-5), false, new THREE.Vector3(0.8,2,1), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/U.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(-4.5,-0.1,-5), false, new THREE.Vector3(0.5,2,1), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/I.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(-5.3,-0.1,-5), false, new THREE.Vector3(0.2,2,1), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/J.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(-6,-0.1,-5), false, new THREE.Vector3(0.7,2,1), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/N.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(-7,-0.1,-5), false, new THREE.Vector3(1,2,1), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Letters/E.fbx', 'resources/textures/Fullwhite.png', new THREE.Vector3(-8,-0.1,-5), false, new THREE.Vector3(0.5,2,1), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/RockSimpleV2.fbx', 'resources/textures/RockTexture.png', new THREE.Vector3(5,-0.1,5), true, new THREE.Vector3(1,2,1), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/RockSimpleV2.fbx', 'resources/textures/RockTexture.png', new THREE.Vector3(10,-0.1,4), true, new THREE.Vector3(4,2,4), new THREE.Vector3(0,0,0), 0,Math.PI *1.5, 4),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/RockSimpleV2.fbx', 'resources/textures/RockTexture.png', new THREE.Vector3(-10,-0.1,6), true, new THREE.Vector3(4,2,4), new THREE.Vector3(0,0,0), Math.PI/2,Math.PI *1.5, 4),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/RockSimpleV2.fbx', 'resources/textures/RockTexture.png', new THREE.Vector3(-16,-0.1,3.5), true, new THREE.Vector3(5,2,5), new THREE.Vector3(0,0,0), Math.PI * 1.3,Math.PI *1.5, 5),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/RockSimpleV2.fbx', 'resources/textures/RockTexture.png', new THREE.Vector3(14,-0.1,-3), true, new THREE.Vector3(5,2,5), new THREE.Vector3(0,0,0), Math.PI * 1.3,Math.PI *1.5, 5),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/RockSimpleV2.fbx', 'resources/textures/RockTexture.png', new THREE.Vector3(-20,-0.1,-3), true, new THREE.Vector3(5,2,5), new THREE.Vector3(0,0,0), Math.PI * 0.4,Math.PI *1.5, 5),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/RockSimpleV2.fbx', 'resources/textures/RockTexture.png', new THREE.Vector3(-2,-0.1,10), true, new THREE.Vector3(6,2,6), new THREE.Vector3(0,0,0),0,Math.PI *1.5, 6),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/LifeBuoy.fbx', 'resources/textures/LifeBuoy.png', new THREE.Vector3(-1.5,-0.1,-19.2), false, new THREE.Vector3(0.2,2,0.2), new THREE.Vector3(0,0,0),0,0, 0.2),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/BasicIsland.fbx', 'resources/textures/BasicIslandTextures/lambert1_Base_color.png', new THREE.Vector3(30,-1,-19.2), true, new THREE.Vector3(6.5,2,6.5), new THREE.Vector3(0,0,0),0,0, 0.5),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Windmill.fbx', 'resources/textures/Windmill.png', new THREE.Vector3(30,0.6,-18), true, new THREE.Vector3(1,2,1), new THREE.Vector3(0,0,0),0,0, 0.5),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/Pointer.fbx', 'resources/textures/Pointer.png', new THREE.Vector3(28,0.6,-20), true, new THREE.Vector3(1,2,1), new THREE.Vector3(0,0,0), 0,0,1),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/SyrupWaffle.fbx', 'resources/textures/SyrupWaffle.png', new THREE.Vector3(32,0.7,-20), true, new THREE.Vector3(1,2,1), new THREE.Vector3(0,0,0), 0,0,0.6),
    new Decoratives(scene, modelLoader, texLoader, engine, 'resources/models/SyrupWaffle.fbx', 'resources/textures/SyrupWaffle.png', new THREE.Vector3(31,0.8,-20), true, new THREE.Vector3(1,2,1), new THREE.Vector3(0,0,0), Math.PI * 0.4,Math.PI * 1.05,0.6)


]

const permaDecoTexts = [
    new DecoText(scene, 'Projects ->', fontLoader, new THREE.Vector3(-1,-0.2,-20.2), 120, Math.PI/2, new THREE.Vector3(0,0,100), 5),
    new DecoText(scene, '<- About Me', fontLoader, new THREE.Vector3(4.8,-0.2,-20.2), 120, Math.PI/2, new THREE.Vector3(0,0,100), 5),
    new DecoText(scene, 'projects', fontLoader, new THREE.Vector3(-0.25,2.6,-20.1), 60, 0, new THREE.Vector3(0,0,0), 1),
    new DecoText(scene, 'me', fontLoader, new THREE.Vector3(1.1,2.6,-20.1), 60, 0, new THREE.Vector3(0,0,0), 1),
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

    if(onMobile == false){
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
    }

    currentlyPressedKey = keyCode;

    for (let i = 0; i < islands.length; i++){
        islands[i].OnButtonDown(event);
    }
};

function MoveForward(){
    posOffset = moveSpeed;
    boat.ResetCamera();
}

function MoveBackward(){
    posOffset = -moveSpeed;
    boat.ResetCamera();
}

function StopMoving(){
    posOffset = 0;
}

let fwButton = document.getElementById('forwardButton');
fwButton.addEventListener('touchstart', MoveForward);
fwButton.addEventListener('touchstart', haltPan);
fwButton.addEventListener('touchend', StopMoving);
fwButton.addEventListener('touchend', allowPan);

let bckButton = document.getElementById('backButton');
bckButton.addEventListener('touchstart', MoveBackward);
bckButton.addEventListener('touchstart', haltPan);
bckButton.addEventListener('touchend', StopMoving);
bckButton.addEventListener('touchend', allowPan);

var startphoneMoveLoc;
var phoneMoveDir = 0;

let leftButton = document.getElementById('leftButton');
leftButton.addEventListener('touchstart', turnBoatLeft);
leftButton.addEventListener('touchstart', haltPan);
leftButton.addEventListener('touchend', stopRotation);
leftButton.addEventListener('touchend', allowPan);

let rightButton = document.getElementById('rightButton');
rightButton.addEventListener('touchstart', turnBoatRight);
rightButton.addEventListener('touchstart', haltPan);
rightButton.addEventListener('touchend', stopRotation);
rightButton.addEventListener('touchend', allowPan);



function turnBoatLeft(){
    rotOffset = rotSpeed;
}

function turnBoatRight(){
    rotOffset = -rotSpeed;
}

function stopRotation(){
    rotOffset = 0;
}

function haltPan(){
    mouse.panIsAllowed = false;
}

function allowPan(){
    mouse.panIsAllowed = true;
}
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


addEventListener('touchstart', (event) => {
    boat.PointerDownEvent();
    mouse.TouchDown(event);
});

addEventListener('touchmove', (event) => {
    //console.log("noticing touch");
    boat.PointerMoveEvent();
    mouse.TouchMoveEvent(event);
});

addEventListener('touchend', (event) => {
    mouse.TouchUp(event);
    boat.PointerUpEvent();
});

onmousedown = (event) => {
    mouse.PointerDownEvent(event);
    boat.PointerDownEvent();
}
onmousemove = (event) => {
    boat.PointerMoveEvent();
    mouse.PointerMoveEvent(event);
}


onmouseup = (event) => {
    mouse.PointerUpEvent();
    boat.PointerUpEvent();
    
}



//this updates frames.
const tick = () => {
    var delta = clock.getDelta();

    if(initialized == true){
        if(onMobile == true){
            mobile.Update();

            if(mouse.panIsAllowed == false){
                boat.ResetCamera();
            }
        }
            // Update objects
        boat.Update(posOffset, rotOffset, delta);

        mouse.UpdateCamera();
        boat.UpdateCameraPos(camera, currentlyPressedKey);

        for (let i = 0; i < islands.length; i++){
            islands[i].Update();
        }

        if(onMobile == false){
        for (let i = 0; i < PCdecoratives.length; i++){
            PCdecoratives[i].Update();
        }
    }
    for (let i = 0; i < permaDecos.length; i++){
        permaDecos[i].Update();
    }

        boat.animate(clock);
    }
    else{
        loadingscreen.Update();

        if(loadingscreen.initialized == true){
            console.log('Initializing');   
            for (let i = 0; i < islands.length; i++){
                islands[i].Initialize();
            }
        
            if(onMobile == false){
            for (let i = 0; i < PCdecoratives.length; i++){
                PCdecoratives[i].Initialize();
            }
        }
        for (let i = 0; i < permaDecos.length; i++){
            permaDecos[i].Initialize();
        }
            boat.Initialize(camera);
            initialized = true;
        }
    }

    Uppersea.model.position.set(camera.position.x, Uppersea.model.position.y, camera.position.z );
    Lowersea.model.position.set(camera.position.x, Lowersea.model.position.y, camera.position.z );

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick()



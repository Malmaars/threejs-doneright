//This script is for the sea..
function Sea(scene) {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load('resources/textures/seaTextureTest.jpg');

    //repeat the texture, so it's not a giant texture that's very pixelized
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(100, 100);

    //the sea itself. It's just a plane like cube
    const seaGeometry = new THREE.BoxGeometry(1000, 1, 1000);

    //the material of the sea. FOr now I have the reflection set very low, I might want to edit this later
    const material = new THREE.MeshStandardMaterial();
    material.color = new THREE.Color(0x73d3f4);
    material.roughness = 0;
    material.metalness = 0;
    material.fog = true;
    material.map = map;

    const sea = new THREE.Mesh(seaGeometry, material)

    scene.add(sea);

    //I set the sea a little lower, so the boat can stay on 0 y position
    sea.position.set(0, -0.6, 0);
}
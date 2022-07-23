//This script is for the sea..
function Sea(scene, textureLoader, path, height, opacity) {
    const map = textureLoader.load(path);

    //repeat the texture, so it's not a giant texture that's very pixelized
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(100, 100);

    //the sea itself. It's just a plane like cube
    const seaGeometry = new THREE.BoxGeometry(2000, 1, 2000);

    //the material of the sea. FOr now I have the reflection set very low, I might want to edit this later
    const material = new THREE.MeshStandardMaterial();
    //material.color = new THREE.Color(0x73d3f4);
    material.roughness = 0;
    material.metalness = 0;
    material.fog = true;
    material.map = map;
    if(opacity < 1){
    material.transparent = true;
    }
    material.opacity = opacity;
    

    const sea = new THREE.Mesh(seaGeometry, material)

    scene.add(sea);

    //I set the sea a little lower, so the boat can stay on 0 y position
    sea.position.set(0, height, 0);
}
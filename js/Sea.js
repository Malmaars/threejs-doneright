function Sea(scene) {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load('resources/seaTextureTest.jpg');

    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(100, 100);

    const seaGeometry = new THREE.BoxGeometry(1000, 1, 1000);

    const material = new THREE.MeshStandardMaterial();
    material.color = new THREE.Color(0x73d3f4);
    material.roughness = 0;
    material.metalness = 0;
    material.fog = true;
    material.map = map;

    const sea = new THREE.Mesh(seaGeometry, material)

    scene.add(sea);

    sea.position.set(0, -1, 0);
}
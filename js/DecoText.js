function DecoText(scene, textString, fontLoader, location, letterSize, xRotation, color, thickness){

    fontLoader.load( 'https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json', function ( font ) {
        var geometry = new THREE.TextGeometry( textString, {
        font: font,
        size: letterSize,
        height: thickness,
        curveSegments: 12,
        } );
        var material = new THREE.MeshStandardMaterial();
        material.metalness = 0;
        material.color.setHSL(color.x,color.y,color.z);
        textMesh1 = new THREE.Mesh( geometry, material);
        textMesh1.scale.set(0.004,0.004,0.004);
        textMesh1.position.set(location.x, location.y, location.z);
        textMesh1.rotation.x = xRotation;
        textMesh1.rotation.y = Math.PI;
        scene.add(textMesh1);
    } );
}
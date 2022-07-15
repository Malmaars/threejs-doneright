//const { LoadingManager } = require("three");

function Island(scene, loadingManager, location, descriptions)

{
    const billboard = new Billboard(scene, loadingManager, "resources/textures/Billboards/billboard_HeadOff.png", new THREE.Vector3(location.x, location.y + 1.65, location.z + 4));
    //This function regulates the islands, which will portray my projects. I want to code it in a way that I can easily add more.
    const texLoader = new THREE.TextureLoader(loadingManager);

    var islandMaterial;

    texLoader.load(
        // resource URL
        "resources/textures/BasicIslandTextures/lambert1_Base_color.png",

        // onLoad callback
        function (texture) {
            // in this example we create the material when the texture is loaded
            islandMaterial = new THREE.MeshStandardMaterial({
                map: texture
            });
        },

        // onProgress callback currently not supported
        undefined,

        // onError callback
        function (err) {
            console.error('An error happened.');
        }
    );

     

    const modelLoader = new THREE.FBXLoader(loadingManager)
    this.model;

    modelLoader.load
        ('resources/models/BiggerIsland.fbx', (function (object) {

            this.model = object;

            object.traverse(function (child) {
                if (child.isMesh) {
                    islandMaterial.metalness = 0;
                    child.material = islandMaterial;
                    
                }
            })
            scene.add(this.model);
        }).bind(this));

        descriptions = [
            'Checking what the maximum width is.',
            'Every piece of text is lower than the last',
            'But I need to write it out like this,',
            'Because I honestly don`t know how else',
            'I`d do it'
        ]
        
        const fontLoader = new THREE.FontLoader(loadingManager);
        
        for(let i = 0; i < descriptions.length; i++){
            fontLoader.load( 'https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json', function ( font ) {
                var geometry = new THREE.TextGeometry( descriptions[i], {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
                } );
                var material = new THREE.MeshStandardMaterial();
                material.metalness = 0;
                textMesh1 = new THREE.Mesh( geometry, material);
                textMesh1.scale.set(0.004,0.004,0.004);
                textMesh1.position.set(location.x + 4, location.y + 2, (location.z + 1)  - i * 0.8);
                textMesh1.rotation.x = Math.PI * 0.4;
                textMesh1.rotation.y = Math.PI * 1;
                scene.add(textMesh1);
            } );
        }

        this.Initialize = function () 
        {
            if(this.model){
                this.model.scale.set(0.8,0.8,0.8);
            this.model.position.set(location.x, location.y, location.z);
            // this.model.position.set(15,-1,-10);'

            billboard.Initialize();
            }
        }
}
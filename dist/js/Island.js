//const { LoadingManager } = require("three");

const { PlaneGeometry } = require("three");

function Island(scene, fontLoader, modelLoader, texLoader, boatReference, location, billboardTexture, title, descriptions, link)
{
    const billboard = new Billboard(scene, modelLoader, texLoader, billboardTexture, new THREE.Vector3(location.x, location.y + 1.65, location.z + 4));
    const platform = new Platform(scene, modelLoader, texLoader, new THREE.Vector3(location.x, location.y + 0.9, location.z - 11), boatReference, link);
    const tree = [
        new Tree(scene, modelLoader, texLoader, new THREE.Vector3(location.x + 3, location.y + 1.65, location.z - 7)),
        new Tree(scene, modelLoader, texLoader, new THREE.Vector3(location.x - 4, location.y + 1.65, location.z - 6)),
    ]
    //This function regulates the islands, which will portray my projects. I want to code it in a way that I can easily add more.

    var islandMaterial;

    texLoader.load(
        // resource URL
        "resources/textures/BasicIslandTextures/Island_Big_WithDock.png",

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

    this.model;

    modelLoader.load
        ('resources/models/BiggerIslandWithDock.fbx', (function (object) {

            this.model = object;

            object.traverse(function (child) {
                if (child.isMesh) {
                    islandMaterial.metalness = 0;
                    child.material = islandMaterial;
                    
                }
            })
            scene.add(this.model);
        }).bind(this));
        
        fontLoader.load( 'https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json', function ( font ) {
            var geometry = new THREE.TextGeometry( title, {
            font: font,
            size: 120,
            height: 5,
            curveSegments: 12,
            } );
            var material = new THREE.MeshStandardMaterial();
            material.metalness = 0;
            textMesh1 = new THREE.Mesh( geometry, material);
            textMesh1.scale.set(0.004,0.004,0.004);
            textMesh1.position.set(location.x + 3.5, location.y + 2, location.z + 1.5);
            textMesh1.rotation.x = Math.PI * 0.4;
            textMesh1.rotation.y = Math.PI * 1;
            scene.add(textMesh1);
        } );

            fontLoader.load( 'https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
                for(let i = 0; i < descriptions.length; i++){
                var geometry = new THREE.TextGeometry( descriptions[i], {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                } );
                var material = new THREE.MeshStandardMaterial();
                material.metalness = 0;
                textMesh1 = new THREE.Mesh( geometry, material);
                textMesh1.scale.set(0.004,0.004,0.004);
                textMesh1.position.set(location.x + 3.5, location.y + 2, (location.z + 0.5)  - i * 0.8);
                textMesh1.rotation.x = Math.PI * 0.4;
                textMesh1.rotation.y = Math.PI * 1;
                scene.add(textMesh1);
            }
            } );
        

        this.Initialize = function () 
        {
            if(this.model){
                this.model.scale.set(0.8,0.8,0.8);
            this.model.position.set(location.x, location.y, location.z);
            // this.model.position.set(15,-1,-10);'

            billboard.Initialize();
            platform.Initialize();

            for(let i = 0; i < tree.length; i++){
                tree[i].Initialize();
            }
            }
        }

        this.Update = function(){
            platform.Update();
        }

        this.OnButtonDown = function(event){
            platform.OnButtonDown(event);
        }

        this.OnButtonUp = function(event){
            platform.OnButtonUp(event)
        }
}
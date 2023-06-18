//const { LoadingManager } = require("three");

//const { PlaneGeometry } = require("three");

function Island(_camera ,scene, fontLoader, modelLoader, texLoader, engine, boatReference, mouseRef, location, billboardTexture, title, descriptions, link)
{
    const billboard = new Billboard(scene, modelLoader, texLoader, billboardTexture, new THREE.Vector3(location.x, location.y + 1.65, location.z + 4));
    const platform = new Platform(_camera ,scene, modelLoader, texLoader, fontLoader, new THREE.Vector3(location.x, location.y + 0.9, location.z - 8), boatReference, mouseRef, link);
    const tree = [
        new Tree(scene, modelLoader, texLoader, new THREE.Vector3(location.x + 6.5, location.y + 1.65, location.z - 0)),
        new Tree(scene, modelLoader, texLoader, new THREE.Vector3(location.x - 7, location.y + 1.65, location.z - 1)),
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

    var geometry = new THREE.BoxGeometry( 11, 5, 16 );
    //var material = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } );
    this.collider = new THREE.Object3D();
    scene.add( this.collider );

    var verticesforIsland = Matter.Vertices.create([{ x: 0, y: 115 }, { x: 60, y: 100 }, { x: 70, y: 90 }, { x: 75, y: 65 },
        { x: 75, y: 0 }, { x: 65, y: -40 }, { x: 70, y: -90 }, { x: 50, y: -105 },
        { x: 0, y: -110 }, { x: -45, y: -100 }, { x: -60, y: -90 }, { x: -60, y: -50 }, 
        { x: -80, y: 0 }, { x: -75, y: 30 }, { x: -80, y: 70 }, { x: -75, y: 95 }]);

    var islandBox = Matter.Bodies.fromVertices(location.x * 10, location.z * 10, verticesforIsland);
    Matter.Composite.add(engine.world, islandBox);
    Matter.Body.scale(islandBox, 0.8, 0.8);
    Matter.Body.setStatic(islandBox, true);
    Matter.Body.rotate(islandBox,Math.PI / 2);


    modelLoader.load
        ('resources/models/BiggerIslandWithDockRotated.fbx', (function (object) {

            this.model = object;

            object.traverse(function (child) {
                if (child.isMesh) {
                    islandMaterial.metalness = 0;
                    child.material = islandMaterial;
                    
                }
            })
            this.collider.add(this.model);
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

            var charArray = Array.from(title);
            console.log(charArray);
            textMesh1.position.set(location.x + charArray.length / 6, location.y + 2, location.z + 1.5);
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
                textMesh1.position.set(location.x + 5, location.y + 2, (location.z + 0.5)  - i * 0.8);
                textMesh1.rotation.x = Math.PI * 0.4;
                textMesh1.rotation.y = Math.PI * 1;
                scene.add(textMesh1);
            }
            } );
        

        this.Initialize = function () 
        {
            if(this.model){
                //this.model.scale.set(0.8,0.8,0.8);
                //this.model.rotateY(Math.PI);
                //this.collider.position.set(location.x, location.y, location.z);
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
            
            this.collider.position.set(islandBox.position.x/10, location.y, islandBox.position.y/10);
            this.collider.rotation.set(0,-islandBox.angle + Math.PI, 0);
            //this.collider.position.set(this.collider.position.x + velocity.x, this.collider.position.y + velocity.y, this.collider.position.z + velocity.z);
        }

        this.OnButtonDown = function(event){
            platform.OnButtonDown(event);
        }

        this.OnButtonUp = function(event){
            platform.OnButtonUp(event)
        }
}
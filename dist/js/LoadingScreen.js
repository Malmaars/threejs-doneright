function LoadingScreen(loadingManager, scene, texLoader, modelLoader, fontLoader, mouse, camera){
        //Make a loadingscreen here and remove it when everything had loaded.

        this.initialized = false;
        var geometry = new THREE.BoxGeometry( 8, 1, 4 );

        //console.log(geometry.parameters.width);
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000 , transparent: true, opacity: 0 } );
        this.collider = new THREE.Mesh(geometry, material);
        scene.add(this.collider);
        this.collider.renderOrder = 1;


        var platformMaterial;

        texLoader.load(
            // resource URL
            "resources/textures/PlatformBasicTexture.png",
    
            // onLoad callback
            function (texture) {
                // in this example we create the material when the texture is loaded
                platformMaterial = new THREE.MeshStandardMaterial({
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
            ('resources/models/PlatformBasic.fbx', (function (object) {
    
                this.model = object;
    
                object.traverse(function (child) {
                    if (child.isMesh) {
                        platformMaterial.metalness = 0;
                        platformMaterial.transparent = true;
                        platformMaterial.opacity = 1;
                        child.material = platformMaterial;
                        
                    }
                })
                scene.add(this.model);
            }).bind(this));
        
            var loadingGeometry;
            var textMesh1;
            fontLoader.load( 'https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json', function ( font ) {
                loadingGeometry = new THREE.TextGeometry( 'LOADING...', {
                font: font,
                size: 120,
                height: 5,
                curveSegments: 12,
                } );
                var material = new THREE.MeshStandardMaterial();
                material.metalness = 0;
                textMesh1 = new THREE.Mesh( loadingGeometry, material);
                textMesh1.scale.set(0.004,0.004,0.004);
                textMesh1.rotation.x = Math.PI * 0.5;
                textMesh1.rotation.y = Math.PI * 1;
                scene.add(textMesh1);
            } );

            var startGeometry;
            var textMesh2;
            fontLoader.load( 'https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_bold.typeface.json', function ( font ) {
                startGeometry = new THREE.TextGeometry( 'START', {
                font: font,
                size: 120,
                height: 5,
                curveSegments: 12,
                } );
                var material = new THREE.MeshStandardMaterial();
                material.metalness = 0;
                textMesh2 = new THREE.Mesh( startGeometry, material);
                textMesh2.scale.set(0.0000001,0.0000001,0.0000001);
                textMesh2.rotation.x = Math.PI * 0.5;
                textMesh2.rotation.y = Math.PI * 1;
                scene.add(textMesh2);
            } );

    var extension;
    modelLoader.load
        ('resources/models/PlatformExtension.fbx', (function (object) {

            extension = object;

            object.traverse(function (child) {
                if (child.isMesh) {
                    platformMaterial.metalness = 0;
                    platformMaterial.transparent = true;
                    platformMaterial.opacity = 0.2;
                    child.material = platformMaterial;
                    
                }
            })
            scene.add(extension);
        }).bind(this));


        this.OnStart = function(){

        }
        this.OnLoad = function(){
            textMesh1.scale.set(0.0000001,0.0000001,0.0000001);
            textMesh2.scale.set(0.004,0.004,0.004);
            this.collider.name = 'Start';
                }

        this.OnProgress = function(){
        }

        this.Initialize = function(){
            console.log('start game');
            this.initialized = true;
            return true;
        }

        this.Update = function(){
            if(this.model && textMesh1 && textMesh2){
            this.model.position.set(camera.position.x, camera.position.y - 8, camera.position.z + 8);
            this.model.rotation.set(0, Math.PI/2, 0);
            this.collider.position.set(this.model.position.x, this.model.position.y, this.model.position.z);
            textMesh1.position.set(camera.position.x + 1.65, camera.position.y - 8, camera.position.z + 7.7);
            textMesh2.position.set(camera.position.x + 1.25, camera.position.y - 8, camera.position.z + 7.7);

            if(mouse.startGame == true){
                this.Initialize();
            }
            // console.log(this.model.position);
            // console.log(camera.position);
            }
        }
}
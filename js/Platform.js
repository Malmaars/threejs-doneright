function Platform(_camera, scene, modelLoader, texLoader, fontLoader, location, boatReference, mouseRef, link) {

    var geometry = new THREE.BoxGeometry( 6, 1, 3 );

    console.log(geometry.parameters.width);
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 , transparent: true, opacity: 0 } );
    this.collider = new THREE.Mesh(geometry, material);
    scene.add( this.collider );

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
                    platformMaterial.opacity = 0.2;
                    child.material = platformMaterial;
                    
                }
            })
            scene.add(this.model);
        }).bind(this));
    
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

        var enterMat;
        texLoader.load(
            // resource URL
            "resources/textures/Fullwhite.png",
    
            // onLoad callback
            function (texture) {
                // in this example we create the material when the texture is loaded
                enterMat = new THREE.MeshStandardMaterial({
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

        var enterObject;
        modelLoader.load
            ('resources/models/IconLink.fbx', (function (object) {
    
                enterObject = object;
    
                object.traverse(function (child) {
                    if (child.isMesh) {
                        enterMat.metalness = 0;
                        enterMat.transparent = true;
                        enterMat.opacity = 0.2;
                        child.material = enterMat;
                        
                    }
                })
                scene.add(enterObject);
            }).bind(this));

        fontLoader.load( 'https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
            var geometry = new THREE.TextGeometry( 'Link', {
            font: font,
            size: 120,
            height: 5,
            curveSegments: 12,
            } );
            var material = new THREE.MeshStandardMaterial();
            material.metalness = 0;
            material.transparent = true;
            material.opacity = 0.3;
            textMesh1 = new THREE.Mesh( geometry, material);
            textMesh1.scale.set(0.004,0.004,0.004);
            textMesh1.position.set(location.x + 1, location.y , location.z - 0.2);
            textMesh1.rotation.x = Math.PI * 0.5;
            textMesh1.rotation.y = Math.PI * 1;
            scene.add(textMesh1);
        } );

        var enterPromptMat;
        var enterPrompt;
        fontLoader.load( 'https://unpkg.com/three@0.77.0/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
            var geometry = new THREE.TextGeometry( 'Press Enter', {
            font: font,
            size: 120,
            height: 20,
            curveSegments: 12,
            } );
            enterPromptMat = new THREE.MeshStandardMaterial();
            enterPromptMat.metalness = 0;
            enterPromptMat.transparent = true;
            enterPromptMat.opacity = 1;
            enterPrompt = new THREE.Mesh( geometry, enterPromptMat);
            enterPrompt.scale.set(0.004,0.004,0.004);
            enterPrompt.position.set(0,2,1.8);
            //textMesh1.rotation.x = Math.PI * 0.5;
            enterPrompt.rotation.y = Math.PI * 0.5;
            //textMesh1.rotation.z = Math.PI * 0.5;
        } );

        this.Initialize = function () 
        {
            extension.add(enterPrompt);
            if(this.model){
                this.model.scale.set(0.6, 0.6, 0.6);
                this.model.rotation.set(0,Math.PI/2,0);
                this.model.position.set(location.x, location.y, location.z);

                extension.scale.set(0.6,0.6,0.6);
                extension.rotation.set(0,Math.PI/2,0);
                extension.position.set(location.x, location.y, location.z);

                enterObject.scale.set(0.4,0.4,0.4);
                enterObject.position.set(location.x - 0.8, location.y + 0.1, location.z - 0.2);
                enterObject.rotation.set(0,Math.PI * 0.75,0);
            }

            this.collider.position.set(location.x, location.y, location.z);
            this.collider.renderOrder = 1;
            this.collider.name = link;
        }

        var currentlyPressedKey;

        this.Update = function(){
            if(boatReference.collider && this.model && extension){
                if(boatReference.collider.position.distanceTo(this.model.position) < 3 || mouseRef.linkHover == link){
                    
                    //extension.position.set(location.x, location.y + 1, location.z);
                    this.AnimatePlatformExtension(new THREE.Vector3(location.x, location.y + 1, location.z), 6);
                    if(currentlyPressedKey == 13){
                        console.log("REDIRECT");
                        window.open(link, link).focus()
                        currentlyPressedKey = null;
                    }
                    enterPrompt.material.opacity = 1;
                }

                else{
                    this.AnimatePlatformExtension(new THREE.Vector3(location.x, location.y - 0.5, location.z), 12);
                    enterPromptMat.opacity = 0;
                }
            }
        }

        this.OnButtonDown = function(event){
            currentlyPressedKey = event.which;
        }

        this.OnButtonUp = function(event){
            currentlyPressedKey = null;
        }

        const clock = new THREE.Clock();
        this.AnimatePlatformExtension = function(newLocation, speed){
            var delta = clock.getDelta();
            extension.position.lerp(newLocation, delta * speed);
        }
}
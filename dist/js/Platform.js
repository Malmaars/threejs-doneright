function Platform(_camera, scene, modelLoader, texLoader, location, boatReference, mouseRef, link) {

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
            ('resources/models/KeyEnter.fbx', (function (object) {
    
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

        this.Initialize = function () 
        {
            if(this.model){
                this.model.scale.set(0.6, 0.6, 0.6);
                this.model.rotation.set(0,Math.PI/2,0);
                this.model.position.set(location.x, location.y, location.z);

                extension.scale.set(0.6,0.6,0.6);
                extension.rotation.set(0,Math.PI/2,0);
                extension.position.set(location.x, location.y, location.z);

                enterObject.scale.set(0.1,0.1,0.1);
                enterObject.position.set(location.x, location.y + 0.1, location.z);
                enterObject.rotation.set(0,Math.PI/2,0);
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
                }

                else{
                    this.AnimatePlatformExtension(new THREE.Vector3(location.x, location.y - 0.5, location.z), 12);
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
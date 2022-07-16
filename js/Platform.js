function Platform(scene, loadingManager, location, boatReference, link) {
    
    const texLoader = new THREE.TextureLoader(loadingManager);

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

     

    const modelLoader = new THREE.FBXLoader(loadingManager)
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

        this.Initialize = function () 
        {
            if(this.model){
                this.model.scale.set(0.5,0.5,0.5);
                this.model.rotation.set(0,90 * Math.PI/180,0);
                this.model.position.set(location.x, location.y, location.z);

                extension.scale.set(0.5,0.5,0.5);
                extension.rotation.set(0,90 * Math.PI/180,0);
                extension.position.set(location.x, location.y, location.z);
            }
        }

        var currentlyPressedKey;

        this.Update = function(){
            if(boatReference.model && this.model && extension){
                if(boatReference.model.position.distanceTo(this.model.position) < 3){
                    extension.position.set(location.x, location.y + 1, location.z);

                    if(currentlyPressedKey == 13){
                        console.log("REDIRECT");
                        window.open(link, link).focus()
                        currentlyPressedKey = null;
                    }
                }

                else{
                    extension.position.set(location.x, location.y - 0.5, location.z);
                }
            }
        }

        this.OnButtonDown = function(event){
            currentlyPressedKey = event.which;
        }

        this.OnButtonUp = function(event){
            currentlyPressedKey = null;
        }
}
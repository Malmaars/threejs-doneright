//The script for the boat
function Boat(scene, loadingManager) {

    const texLoader = new THREE.TextureLoader(loadingManager);

    var boatMaterial;

    // load a resource
    texLoader.load(
        // resource URL
        "resources/textures/BoatTextures/lambert1_Base_color.jpg",

        // onLoad callback
        function (texture) {
            // in this example we create the material when the texture is loaded
            boatMaterial = new THREE.MeshStandardMaterial({
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
    var mixer;

    //load in the boat, from reference in the resource folder.
    modelLoader.load
        ('resources/models/BoatAnimated.fbx', (function (object) {

            this.model = object;
            //this.model.scale.set(0.01,0.01,0.01);
            mixer = new THREE.AnimationMixer(this.model);

            const action = mixer.clipAction(this.model.animations[0]);
            action.play();

            object.traverse(function (child) {
                if (child.isMesh) {
                    boatMaterial.metalness = 0;
                    child.material = boatMaterial;
                    
                }
            })
            scene.add(this.model);
        }).bind(this));


    var slowdown = 0.03;
    var haltDirection;

    //I use velocity and add it to the position of the boat, so it drifts more, like it should at sea
    var velocity = new THREE.Vector3();

    this.Update = function (positionOffset, rotationOffset) {
        if (this.model) {
            var moveDirection = new THREE.Vector3();
            this.model.getWorldDirection(moveDirection);

            //slow the boat down when you stop giving input
            if (positionOffset == 0 && haltDirection != null) {
                slowdown = 0.99;
                velocity.setZ(velocity.z * slowdown);
                velocity.setX(velocity.x * slowdown);
            }

            //add the velocity based on input 
            else {
                slowdown = -positionOffset;
                haltDirection = moveDirection;

                velocity.setZ(velocity.z + moveDirection.z * -positionOffset);
                velocity.setX(velocity.x + moveDirection.x * -positionOffset);
            }

            //clamp the length to control the speed.
            //We don't do a usual clamp, because that would result eventually in moving only in degrees of 90.
            velocity.clampLength(-0.04, 0.04);
            this.model.position.set(this.model.position.x + velocity.x, this.model.position.y + velocity.y, this.model.position.z + velocity.z);
            this.model.rotateY(rotationOffset);
        }
    }

    //The camera will stay with the boat.
    //I'll have to change this when the player is close to an island to see info better.
    this.UpdateCameraPos = function (camera) {
        if (this.model) {
            camera.position.x = this.model.position.x;
            camera.position.y = this.model.position.y + 6;
            camera.position.z = this.model.position.z - 6;
        }
    }

    this.animate = function(clock) {
        // animation with THREE.AnimationMixer.update(timedelta)
        var delta = clock.getDelta();                
        if (mixer) {
            if(this.mixer){ mixer.update(delta);}
            console.log(mixer.time);
        }
    }
}
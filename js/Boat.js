
function Boat(scene) {

    var modelLoader = new THREE.OBJLoader()

    this.model;

    modelLoader.load
        ("resources/SimpleBoat.obj", (function (obj) {
            this.model = obj;
            this.model.scale.set(0.1,0.1,0.1);
            //this.model.scale.set(0.1,0.1,0.1);
            this.model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.metalness = 0;
                }
            })
            scene.add(this.model);

        }).bind(this));


        var slowdown = 0.03;
        var haltDirection;

        var velocity = new THREE.Vector3();
        this.Update = function (positionOffset, rotationOffset) {
        if (this.model) {
            var moveDirection = new THREE.Vector3();
            this.model.getWorldDirection(moveDirection);

            if(positionOffset == 0 && haltDirection != null)
            {
                slowdown = 0.99;
                velocity.setZ(velocity.z * slowdown);
                velocity.setX(velocity.x * slowdown);
            }

            else
            {
                slowdown = -positionOffset;
                haltDirection = moveDirection;
                
                velocity.setZ(velocity.z + moveDirection.z * -positionOffset);
                velocity.setX(velocity.x + moveDirection.x * -positionOffset);
            }

            console.log(velocity);

            velocity.clampLength(-0.04, 0.04);
            this.model.position.set(this.model.position.x + velocity.x, this.model.position.y + velocity.y, this.model.position.z + velocity.z);


            this.model.rotateY(rotationOffset);
            // this.model.position.x += moveDirection.x * positionOffset;
            // this.model.position.y += moveDirection.y * positionOffset;
            // this.model.position.z += moveDirection.z * positionOffset;

            //this.model.rotation.y += rotationOffset;

            //we want the boat to slowly come to a halt, as with water


        }
    }

    this.UpdateCameraPos = function (camera) {
        if (this.model) {
            camera.position.x = this.model.position.x;
            camera.position.y = this.model.position.y + 6;
            camera.position.z = this.model.position.z - 6;
        }
    }
}
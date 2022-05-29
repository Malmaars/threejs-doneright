
function Boat(scene) {

    var modelLoader = new THREE.OBJLoader()

    this.model;

    modelLoader.load
        ("resources/SimpleBoat.obj", (function (obj) {
            this.model = obj;
            //this.model.scale.set(0.1,0.1,0.1);
            this.model.traverse(function (child) {
                if (child.isMesh) {
                    child.material.metalness = 0;
                }
            })
            scene.add(this.model);

        }).bind(this));

    this.Update = function (positionOffset, rotationOffset) {
        if (this.model) {
            var moveDirection = new THREE.Vector3();
            this.model.getWorldDirection(moveDirection);

            //this.model.lookAt(moveDirection);
            this.model.position.z += moveDirection.z * -positionOffset;
            this.model.position.x += moveDirection.x * -positionOffset;
            this.model.rotateY(rotationOffset);
            // this.model.position.x += moveDirection.x * positionOffset;
            // this.model.position.y += moveDirection.y * positionOffset;
            // this.model.position.z += moveDirection.z * positionOffset;

            //this.model.rotation.y += rotationOffset;
        }
    }

    this.UpdateCameraPos = function (camera) {
        if (this.model) {
            camera.position.x = this.model.position.x;
            camera.position.y = this.model.position.y + 40;
            camera.position.z = this.model.position.z - 40;
        }
    }
}
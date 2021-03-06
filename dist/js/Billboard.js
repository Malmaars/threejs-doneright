function Billboard(scene, modelLoader, texLoader, path, location)
{
    var billBoardMaterial;

    texLoader.load(
        // resource URL
        path,

        // onLoad callback
        function (texture) {
            // in this example we create the material when the texture is loaded
            billBoardMaterial = new THREE.MeshStandardMaterial({
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
        ('resources/models/billboardV2.fbx', (function (object) {

            this.model = object;

            object.traverse(function (child) {
                if (child.isMesh) {
                    billBoardMaterial.metalness = 0;
                    billBoardMaterial.transparent = true;
                    child.material = billBoardMaterial;
                    
                }
            })
            scene.add(this.model);
        }).bind(this));

        this.Initialize = function () 
        {
            if(this.model){
                this.model.scale.set(0.5,0.5,0.5);
                this.model.rotation.set(0,90 * Math.PI/180,0);
                this.model.position.set(location.x, location.y, location.z);
            }
        }

}
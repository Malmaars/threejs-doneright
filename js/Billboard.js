function Billboard(scene, loadingManager, path, location)
{
    const texLoader = new THREE.TextureLoader(loadingManager);

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

    const modelLoader = new THREE.FBXLoader(loadingManager)
    this.model;

    modelLoader.load
        ('resources/models/billboard.fbx', (function (object) {

            this.model = object;

            object.traverse(function (child) {
                if (child.isMesh) {
                    billBoardMaterial.metalness = 0;
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
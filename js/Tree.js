function Tree(scene, modelLoader, texLoader, location)
{
    var treeMaterial;

    texLoader.load(
        // resource URL
        "resources/textures/Tree_Simple_Texture.png",

        // onLoad callback
        function (texture) {
            // in this example we create the material when the texture is loaded
            treeMaterial = new THREE.MeshStandardMaterial({
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
        ('resources/models/SimpleTree.fbx', (function (object) {

            this.model = object;

            object.traverse(function (child) {
                if (child.isMesh) {
                    treeMaterial.metalness = 0;
                    child.material = treeMaterial;
                    
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
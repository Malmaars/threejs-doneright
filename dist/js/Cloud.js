function Cloud(scene, modelLoader, texLoader){

    var cloudMaterial;

    texLoader.load(
        // resource URL
        "resources/textures/PlatformBasicTexture.png",

        // onLoad callback
        function (texture) {
            // in this example we create the material when the texture is loaded
            cloudMaterial = new THREE.MeshStandardMaterial({
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
        ('resources/models/Cloud_VeryBasic.fbx', (function (object) {

            this.model = object;

            object.traverse(function (child) {
                if (child.isMesh) {
                    cloudMaterial.metalness = 0;
                    cloudMaterial.transparent = true;
                    cloudMaterial.opacity = 0;
                    child.material = cloudMaterial;
                }
            })
            scene.add(this.model);
        }).bind(this));

    this.ResetAnimation = function(location){
        cloudMaterial.opacity = 1;
        this.model.position.set(location.x, location.y, location.z);
        this.model.scale.set(0.01,0.01,0.01);
    }

    this.AnimateCloud = function(){
        this.model.position.set(this.model.position.x, this.model.position.y + 0.01, this.model.position.z);
        this.model.scale.set(this.model.scale.x + 0.002, this.model.scale.y + 0.002, this.model.scale.z + 0.002);
        if(cloudMaterial.opacity > 0){
            cloudMaterial.opacity = cloudMaterial.opacity - 0.002;
        }
    }

    this.CheckOpacity = function(){
        return cloudMaterial.opacity;
    }
}
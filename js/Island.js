function Island(scene, loadingManager, location)
{
    //This function regulates the islands, which will portray my projects. I want to code it in a way that I can easily add more.
    const texLoader = new THREE.TextureLoader(loadingManager);

    var islandMaterial;

    texLoader.load(
        // resource URL
        "resources/textures/BasicIslandTextures/lambert1_Base_color.png",

        // onLoad callback
        function (texture) {
            // in this example we create the material when the texture is loaded
            islandMaterial = new THREE.MeshStandardMaterial({
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
        ('resources/models/BasicIsland.fbx', (function (object) {

            this.model = object;

            object.traverse(function (child) {
                if (child.isMesh) {
                    islandMaterial.metalness = 0;
                    child.material = islandMaterial;
                    
                }
            })
            scene.add(this.model);
        }).bind(this));

        this.Initialize = function () 
        {
            if(this.model){
                this.model.scale.set(0.5,0.5,0.5);
            this.model.position.set(location.x, location.y, location.z);
            // this.model.position.set(15,-1,-10);
            }
        }
}
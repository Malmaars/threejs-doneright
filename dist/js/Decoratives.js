function Decoratives(scene, modelLoader, texLoader, engine, modelPath, texPath, location, kinematic, colliderSize, modelOffset){
    
    var geometry = new THREE.BoxGeometry( colliderSize.x, colliderSize.y, colliderSize.z );

    console.log(geometry.parameters.width);
    //var material = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } );
    this.collider = new THREE.Object3D();
    scene.add( this.collider );

    var decoBox = Matter.Bodies.rectangle(location.x* 10, location.z* 10, colliderSize.x* 10, colliderSize.z* 10);
    Matter.Composite.add(engine.world, decoBox);
    Matter.Body.setStatic(decoBox, kinematic);

    var material;

    texLoader.load(
        // resource URL
        texPath,

        // onLoad callback
        function (texture) {
            // in this example we create the material when the texture is loaded
            material = new THREE.MeshStandardMaterial({
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
        (modelPath, (function (object) {

            this.model = object;

            object.traverse(function (child) {
                if (child.isMesh) {
                    material.metalness = 0;
                    material.transparent = false;
                    child.material = material;
                    
                }
            })
            this.collider.add(this.model);
        }).bind(this));

        this.Initialize = function(){
            this.model.position.set(modelOffset.x, modelOffset.y, modelOffset.z);

            // this.collider.position.set(location.x, location.y, location.z);
        }

        this.Update = function(){
            this.collider.position.set(decoBox.position.x/10, this.collider.position.y, decoBox.position.y/10);
            this.collider.rotation.set(0,-decoBox.angle + Math.PI, 0);
        }
}
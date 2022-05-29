
function Boat(scene) {

    var modelLoader = new THREE.OBJLoader()
    
    this.model;
    
    modelLoader.load
    ("resources/SimpleBoat.obj", ( function(obj) {
        this.model = obj;
        this.model.scale.set(0.1,0.1,0.1);
        this.model.traverse( function (child) {
            if ( child.isMesh ) {
                child.material.metalness = 0;
            }
        })
        scene.add(this.model);

    }).bind(this));

    this.Update = function()
    {
        if(this.model){
            this.model.rotation.y += 0.01;
        }
    }
}
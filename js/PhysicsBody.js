function PhysicsBody(object, colliderDimensions)
{
    //this.object = object;
    var velocity = new THREE.Vector3(0,0,0);
    const gravity = -0.1;

    //vector 3 that gives height, width and length so I can calculate collisions;
    const dimensions = colliderDimensions;
    this.UpdatePhysics = function()
    {
        var lastposition = new THREE.Vector3(object.position.x, object.position.y, object.position.z); 
        object.position.set(object.position.x + velocity.x, object.position.y + velocity.y + gravity, object.position.z + velocity.z);

        var offset = new THREE.Vector3(lastposition.x - object.position.x,lastposition.y - object.position.y,lastposition.z - object.position.z);
        velocity.addVectors(velocity, offset);
        // console.log(offset);
        // console.log(object.position);


        if(object.position.y < -0.6){
            velocity = new THREE.Vector3(velocity.x, velocity.y + 0.5, velocity.z);
        }
    }
}
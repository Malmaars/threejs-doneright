function PhysicsBody(object, colliderDimensions, kinematic)
{
    //this.object = object;
    this.velocity = new THREE.Vector3(0,0,0);
    const gravity = -0.05;
    this.kinematic = kinematic;

    this.lastPosition = object.position;
    //vector 3 that gives height, width and length so I can calculate collisions;
    this.object = object;
    this.dimensions = colliderDimensions;

    this.Initialize = function(){
        this.velocity = new THREE.Vector3(0,0,0);
        this.lastposition = object.position;
    }

    this.UpdatePhysics = function()
    { 
        var offset = new THREE.Vector3(this.object.position.x - this.lastPosition.x, this.object.position.y - this.lastPosition.y, this.object.position.z - this.lastPosition.z);
        // this.velocity = new THREE.Vector3(this.velocity.x + offset.x / 2, this.velocity.y + offset.y / 2,this.velocity.z + offset.z / 2);
        this.velocity = new THREE.Vector3((this.velocity.x) * 0.9, (this.velocity.z)  * 0.9, (this.velocity.z)  * 0.9);

        this.velocity.clamp(new THREE.Vector3(-0.1, -0.1, -0.1), new THREE.Vector3(0.1, 0.1, 0.1));
        

        this.velocity.set(this.velocity.x, 0, this.velocity.z);

        this.lastPosition = new THREE.Vector3(this.object.position.x, this.object.position.y, this.object.position.z);
        return this.velocity;
    }

    this.SetVelocity = function(newVelocity){
        this.velocity = newVelocity;
    }

    this.AddVelocity = function(addedVector){
        this.velocity = new THREE.Vector3(this.velocity.x + addedVector.x, this.velocity.y + addedVector.y, this.velocity.z + addedVector.z);
    }
}
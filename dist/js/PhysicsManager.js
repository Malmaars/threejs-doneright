function PhysicsManager(){

    const raycaster = new THREE.Raycaster();
    var kinematicPhysicsPool = [];
    var activePhysicsPool = [];

    this.Update = function(){
        for(let i = 0; i < activePhysicsPool.length; i++){
            //check collisions
            for(let k = 0; k < activePhysicsPool.length; k++){
                if(k == i){
                    continue;
                }
             if(this.CheckCollision(activePhysicsPool[i], activePhysicsPool[k]) != false){
                console.log("COLLISION WITH ACTIVE OBJECTS");
                var firstVelocity = activePhysicsPool[i].velocity;
                var secondVelocity = activePhysicsPool[k].velocity;

                raycaster.set(activePhysicsPool[i].object.position, activePhysicsPool[k].object.position);
                //this.HandleCollision(activePhysicsPool[k], activePhysicsPool[i]);

                console.log(activePhysicsPool[i].velocity);

                if(Math.sqrt(Math.pow(firstVelocity.x, 2) + Math.pow(firstVelocity.y, 2)) > Math.sqrt(Math.pow(secondVelocity.x, 2) + Math.pow(secondVelocity.y, 2))){
                    activePhysicsPool[k].velocity = new THREE.Vector3(firstVelocity.x, firstVelocity.y, firstVelocity.z);
                    // activePhysicsPool[i].velocity = new THREE.Vector3(0,0,0);
                }

                else{
                    activePhysicsPool[i].velocity = secondVelocity;
                    //activePhysicsPool[k].velocity = new THREE.Vector3(-activePhysicsPool[i].velocity.x, -activePhysicsPool[i].velocity.y, -activePhysicsPool[i].velocity.z);
                }
             }
            }

            for(let k = 0; k < kinematicPhysicsPool.length; k++){
                var collisionPoint = this.CheckCollision(activePhysicsPool[i], kinematicPhysicsPool[k])
                if(collisionPoint != false){
                    console.log("COLLISION WITH KINEMATIC OBJECT");
                    //activePhysicsPool[i].velocity = new THREE.Vector3(-activePhysicsPool[i].velocity.x, -activePhysicsPool[i].velocity.y, -activePhysicsPool[i].velocity.z);

                    //this.HandleCollision(activePhysicsPool[i], kinematicPhysicsPool[k], collisionPoint);
                }
            }
        }
    }

    this.AddPhysicsObjectToScene = function(object){
        if(object.kinematic == true){
            kinematicPhysicsPool.push(object);
        }
        else{
            activePhysicsPool.push(object)
        }
    }

    this.RemovePhysicsObjectFromScene = function(object, kinematic){
        if(kinematic == true){
            kinematicPhysicsPool.splice(object);
        }
        else{
            activePhysicsPool.splice(object)
        }
    }

    
    this.CheckCollision = function(_physicsObject, _physicsObject2){

        //gotta keep rotation in mind as well

        //instead of treating the colliders like sides, I could treat them as vectors, and check if all vectors are a set distance from 
        //the vectors of the others objects, meaning part of it is inside the collider

        //something like: Tranform.forward * depth + height / 2  = y, Transform.forward * depth + transform.right * width / 2 = x, Transform.forward * depth = z
        //I can use THREE.Vector3.cross(vector) to get the right vector from the forward vector

        //things will not roll over, so this is fine
        var thisForward = new THREE.Vector3();
        _physicsObject2.object.getWorldDirection(thisForward);
        var thisRight = new THREE.Vector2(thisForward.z, -thisForward.x);

        var targetForward = new THREE.Vector3();
        _physicsObject.object.getWorldDirection(targetForward);
        var targetRight = new THREE.Vector2(targetForward.z, -targetForward.x);

        var A = new THREE.Vector2(_physicsObject2.object.position.x - thisForward.x * (_physicsObject2.dimensions.z / 2) + thisRight.x * (_physicsObject2.dimensions.x / 2), _physicsObject2.object.position.z - thisForward.z * (_physicsObject2.dimensions.z / 2) + thisRight.y * (_physicsObject2.dimensions.x / 2))
        var B = new THREE.Vector2(_physicsObject2.object.position.x - thisForward.x * (_physicsObject2.dimensions.z / 2) - thisRight.x * (_physicsObject2.dimensions.x / 2), _physicsObject2.object.position.z - thisForward.z * (_physicsObject2.dimensions.z / 2) - thisRight.y * (_physicsObject2.dimensions.x / 2))
        var D = new THREE.Vector2(_physicsObject2.object.position.x + thisForward.x * (_physicsObject2.dimensions.z / 2) + thisRight.x * (_physicsObject2.dimensions.x / 2), _physicsObject2.object.position.z + thisForward.z * (_physicsObject2.dimensions.z / 2) + thisRight.y * (_physicsObject2.dimensions.x / 2))

        //var D = this.object.position + (thisForward * (this.dimensions.z / 2)) - thisRight * (this.dimensions.x / 2);
        
        var AB = new THREE.Vector2(B.x - A.x, B.y - A.y);
        var AD = new THREE.Vector2(D.x - A.x, D.y - A.y);
        
        for(let i = -1; i <= 1 ; i+=2){
            for(let k = -1; k <= 1 ; k+=2){
                
                var M = new THREE.Vector2(_physicsObject.object.position.x - targetForward.x * (_physicsObject.dimensions.z / 2) * i + targetRight.x * (_physicsObject.dimensions.x / 2) * k, _physicsObject.object.position.z - targetForward.z * (_physicsObject.dimensions.z / 2) * i + targetRight.y * (_physicsObject.dimensions.x / 2) * k)
                var AM = new THREE.Vector2(M.x - A.x, M.y - A.y);

                var DotABAM = AB.dot(AM);
                var DotABAB = AB.dot(AB);
                var DotADAM = AD.dot(AM);
                var DotADAD = AD.dot(AD);

                if(0 < DotABAM && DotABAM < DotABAB && 0 < DotADAM && DotADAM < DotADAD){
                    return M;
                }
            }
        }

        return false;
        //four vertexes because we only take the 2d space in account
    }

    this.HandleCollision = function(firstObject, secondObject, collisionPoint){

        var direction = new THREE.Vector2(secondObject.object.position.x - firstObject.object.position.x, secondObject.object.position.y - firstObject.object.position.y);
        direction.normalize();
        
        console.log(collisionPoint);
        var directionOne = new THREE.Vector2(collisionPoint.x - firstObject.object.position.x, collisionPoint.y - firstObject.object.position.z);
        directionOne.normalize();

        var directionTwo = new THREE.Vector2(collisionPoint.x - secondObject.object.position.x, collisionPoint.y - secondObject.object.position.z);
        directionTwo.normalize();

        var firstDistanceX = Math.sqrt(Math.pow(firstObject.dimensions.x / 2 * directionOne.x ,2));
        var firstDistanceY = Math.sqrt(Math.pow(firstObject.dimensions.z / 2 * directionOne.y ,2))
        var distanceFromFirstObjectToHit = firstDistanceX + firstDistanceY;
        
        var secondDistanceX = Math.sqrt(Math.pow(secondObject.dimensions.x / 2 * directionTwo.x ,2));
        var secondDistanceY = Math.sqrt(Math.pow(secondObject.dimensions.z / 2 * directionTwo.y ,2))
        var distanceFromSecondObjectToHit = secondDistanceX + secondDistanceY;

        var V2PositionOne = new THREE.Vector2(firstObject.object.position.x, firstObject.object.position.z);
        var V2PositionTwo = new THREE.Vector2(secondObject.object.position.x, secondObject.object.position.z);
      
            console.log("THEY ARE INSIDE EACH OTHER");
            
            if(firstObject.kinematic == true){
                //move the second object
                //move the difference between the distance in the direction of the direction vector
                var offset = distanceFromFirstObjectToHit + distanceFromSecondObjectToHit - V2PositionOne.distanceTo(V2PositionTwo) ; 

                secondObject.AddVelocity(new THREE.Vector3(direction.x * offset / 10, 0, direction.y * offset / 10));
            }

            else if(secondObject.kinematic == true){
                //move the first object
                
                //var offset = distanceFromFirstObjectToHit + distanceFromSecondObjectToHit - V2PositionOne.distanceTo(V2PositionTwo) ; 

                //firstObject.AddVelocity(new THREE.Vector3(-direction.x * offset / 10, 0, -direction.y * offset / 10));
                //firstObject.AddVelocity(new THREE.Vector3(collisionPoint.x - directionOne.x * distanceFromFirstObjectToHit, firstObject.object.position.y, collisionPoint.y - directionOne.y * distanceFromFirstObjectToHit));
                var meantCollisionPoint = new THREE.Vector2(V2PositionTwo.x + directionTwo.x * secondDistanceX, V2PositionTwo.y + directionTwo.y * secondDistanceY);
                console.log(meantCollisionPoint);

                    var otherObjectDirection = new THREE.Vector3();
                    secondObject.object.getWorldDirection(otherObjectDirection);
                    directionOne = new THREE.Vector2(directionOne.x - otherObjectDirection.x, directionOne.y = otherObjectDirection.z);


                if(Math.sqrt(Math.pow(directionOne.x ,2)) < Math.sqrt(Math.pow(directionOne.y ,2))){
                    
                    firstObject.object.position.set(meantCollisionPoint.x + otherObjectDirection.x * firstDistanceX + directionOne.x * firstDistanceX, firstObject.object.position.y, meantCollisionPoint.y);
                }
                else{
                    firstObject.object.position.set(meantCollisionPoint.x, firstObject.object.position.y, meantCollisionPoint.y + otherObjectDirection.y * firstDistanceY + directionOne.y * firstDistanceY);
                }
            }

            else{
                console.log("Moving both");
                //move both;
                var offset = distanceFromFirstObjectToHit + distanceFromSecondObjectToHit - V2PositionOne.distanceTo(V2PositionTwo) ; 

                firstObject.AddVelocity(new THREE.Vector3(-direction.x * offset * 10, 0, -direction.y * offset* 10 ));
                secondObject.AddVelocity(new THREE.Vector3(direction.x * offset * 10, 0, direction.y * offset * 10));

            }
    }
}
function Mouse(_camera, scene)
{
    var camera = _camera;
    var movingBoolean;
    var previousCameraPos;
    var previousMousePosition;
    
    var velocity = new THREE.Vector3(0,0,0);

    this.UpdateCamera = function(){
        if(!movingBoolean){
            velocity.setX(velocity.x * 0.99);
            velocity.setZ(velocity.z * 0.99);

            if(!(velocity.x < -0.01 || velocity.x > 0.01) && !(velocity.z < -0.01 || velocity.z > 0.01)){
                velocity.setX(0);
                velocity.setZ(0);
            }
        camera.position.set(camera.position.x + velocity.x, camera.position.y, camera.position.z + velocity.z);
        }
    }

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    this.PointerMoveEvent = function (event) 
    {
        if(movingBoolean == true){
            // console.log("Updating camera");
        var offset = new THREE.Vector3( event.screenX - previousMousePosition.x, 0, event.screenY - previousMousePosition.z);

        velocity.set(offset.x * 0.03, 0, offset.z * 0.03);

        // console.log(offset);
        camera.position.set(previousCameraPos.x + offset.x * 0.03, previousCameraPos.y, previousCameraPos.z + offset.z * 0.03);
        // console.log(camera.position);
        }
                // console.log("Mouse");
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( pointer, camera )
        const intersects = raycaster.intersectObjects( scene.children, true );
                
        for ( let i = 0; i < intersects.length; i ++ ) {
    
            if(intersects[i].object.name == 'interactible'){
                console.log("can interact");
            }
    
        }

        //cast a ray to check if it's in range of any clickables
        previousMousePosition = new THREE.Vector3(event.screenX, 0, event.screenY);

    }

    this.PointerDownEvent = function(event) 
    { 
        movingBoolean = true;
        previousCameraPos = camera.position;

    };
    this.PointerUpEvent = function()
    { 
        movingBoolean = false;
        // console.log("click");
    };

}
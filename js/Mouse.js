function Mouse(_camera, scene)
{
    var touchControls = false;
    var camera = _camera;
    var movingBoolean;
    var previousCameraPos;
    var previousMousePosition;
    var previousTouchPosition = new THREE.Vector3(0,0,0);

    this.linkHover;
    this.startGame = false;

    this.panIsAllowed = true;
    
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

    
    this.TouchDown = function(event){
        touchControls = true;

        movingBoolean = true;
        previousCameraPos = camera.position;

        pointer.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( pointer, camera )
        const intersects = raycaster.intersectObjects( scene.children, true );
                
        for ( let i = 0; i < intersects.length; i ++ ) {
    
            var output = intersects[i].object.name.split('');
            
            if(output[0] == 'h' && output[1] == 't' && output[2] == 't' &&output[3] == 'p' && output[4] == 's' )
            {   
                movingBoolean = false;
                //also trigger the animation somehow
                window.open(intersects[i].object.name, intersects[i].object.name).focus();
            }

            if(intersects[i].object.name == 'Start')
            {   
                movingBoolean = false;
                //also trigger the animation somehow
                //start level
                this.startGame = true;
            }
        }
    }

    this.TouchMoveEvent = function (event) 
    {
        if(this.panIsAllowed == true){
        document.body.style.cursor = "grab";
        if(movingBoolean == true){
            document.body.style.cursor = "grabbing";
            // console.log("Updating camera");
        var offset = new THREE.Vector3( event.touches[0].screenX - previousTouchPosition.x, 0, event.touches[0].screenY - previousTouchPosition.z);

        offset.clampLength(-15,15);
        velocity.set(offset.x * 0.03, 0, offset.z * 0.03);

        camera.position.set(previousCameraPos.x + offset.x * 0.03, previousCameraPos.y, previousCameraPos.z + offset.z * 0.03);
        // console.log(camera.position);
        }

        
        pointer.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( pointer, camera )
        const intersects = raycaster.intersectObjects( scene.children, true );
                
        var none = true;
        for ( let i = 0; i < intersects.length; i ++ ) {
    
            var output = intersects[i].object.name.split('');
            
            if(output[0] == 'h' && output[1] == 't' && output[2] == 't' &&output[3] == 'p' && output[4] == 's' )
            {   
                this.linkHover = intersects[i].object.name;
                document.body.style.cursor = "pointer";
                //also trigger the animation somehow
                none = false;
            }

            if(intersects[i].object.name == "Start"){
                this.linkHover = intersects[i].object.name;
                document.body.style.cursor = "pointer";
                //also trigger the animation somehow
                none = false;
            }
        }

        if(none == true){
            this.linkHover = null;
        }
    }
                // console.log("Mouse");
        //cast a ray to check if it's in range of any clickables
        previousTouchPosition = new THREE.Vector3(event.touches[0].screenX, 0, event.touches[0].screenY);
        }

    this.TouchUp = function(event){
        touchControls = false;
        movingBoolean = false;
    }

    this.PointerMoveEvent = function (event) 
    {
        if(touchControls == false){
        document.body.style.cursor = "grab";
        if(movingBoolean == true){
            document.body.style.cursor = "grabbing";
            // console.log("Updating camera");
        var offset = new THREE.Vector3( event.screenX - previousMousePosition.x, 0, event.screenY - previousMousePosition.z);

        offset.clampLength(-15,15);
        velocity.set(offset.x * 0.03, 0, offset.z * 0.03);

        camera.position.set(previousCameraPos.x + offset.x * 0.03, previousCameraPos.y, previousCameraPos.z + offset.z * 0.03);
        // console.log(camera.position);
        }

        
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( pointer, camera )
        const intersects = raycaster.intersectObjects( scene.children, true );
                
        var none = true;
        for ( let i = 0; i < intersects.length; i ++ ) {
    
            var output = intersects[i].object.name.split('');
            
            if(output[0] == 'h' && output[1] == 't' && output[2] == 't' &&output[3] == 'p' && output[4] == 's' )
            {   
                this.linkHover = intersects[i].object.name;
                document.body.style.cursor = "pointer";
                //also trigger the animation somehow
                none = false;
            }

            if(intersects[i].object.name == "Start"){
                this.linkHover = intersects[i].object.name;
                document.body.style.cursor = "pointer";
                //also trigger the animation somehow
                none = false;
            }
        }

        if(none == true){
            this.linkHover = null;
        }
                // console.log("Mouse");
        //cast a ray to check if it's in range of any clickables
        previousMousePosition = new THREE.Vector3(event.screenX, 0, event.screenY);
    }
    }


    this.PointerDownEvent = function(event) 
    { 
        if(touchControls == false){
        movingBoolean = true;
        previousCameraPos = camera.position;

        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( pointer, camera )
        const intersects = raycaster.intersectObjects( scene.children, true );
                
        for ( let i = 0; i < intersects.length; i ++ ) {
    
            var output = intersects[i].object.name.split('');
            
            if(output[0] == 'h' && output[1] == 't' && output[2] == 't' &&output[3] == 'p' && output[4] == 's' )
            {   
                movingBoolean = false;
                //also trigger the animation somehow
                window.open(intersects[i].object.name, intersects[i].object.name).focus();
            }

            if(intersects[i].object.name == 'Start')
            {   
                movingBoolean = false;
                //also trigger the animation somehow
                //start level
                this.startGame = true;
            }
        }
    }
    };
    
    this.PointerUpEvent = function()
    { 
        movingBoolean = false;
        // console.log("click");
    };

}
//const { Vector2 } = require("three");

//The script for the boat
function Boat(scene, modelLoader, texLoader, engine) {

    var boatMaterial;
    var propellor;
    var cloudObjectPool = new ObjectPool();

    for(let i = 0; i < 20; i++){
    cloudObjectPool.ReturnToPool(new Cloud(scene, modelLoader, texLoader));
    }


    // load a resource
    texLoader.load(
        // resource URL
        "resources/textures/BoatTextures/lambert1_Base_color.jpg",

        // onLoad callback
        function (texture) {
            // in this example we create the material when the texture is loaded
            boatMaterial = new THREE.MeshStandardMaterial({
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
    var mixer;
    var action;

    //this.transform = new Ammo.btTransform();

    var geometry = new THREE.BoxGeometry( 1, 1, 3 );

    console.log(geometry.parameters.width);
    //var material = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0 } );
    this.collider = new THREE.Object3D();
    scene.add( this.collider );

    var verticesforBoat = Matter.Vertices.create([{ x: 15, y: 0 }, { x: 0, y: 5 }, { x: -15, y: 0 }, { x: 0, y: -5 }]);
    var boatBox = Matter.Bodies.fromVertices(0,0,verticesforBoat);
    // var boatBox = Matter.Bodies.rectangle(0, 0, 30, 10);
    Matter.Composite.add(engine.world, boatBox);
    Matter.Body.setDensity(boatBox, 0.1);
    boatBox.friction = 0.01;

    //load in the boat, from reference in the resource folder.
    modelLoader.load
        ('resources/models/BoatAnimated.fbx', (function (object) {

            this.model = object;
            //mixer = new THREE.AnimationMixer(this.model);

            console.log(this.model.animations[0]);
            //action = mixer.clipAction(this.model.animations[0]);
            object.traverse(function (child) {
                if (child.isMesh) {
                    boatMaterial.metalness = 0;
                    child.material = boatMaterial;
                }
            })
            this.collider.add(this.model);
            //action.play();
        }).bind(this));

    var slowdown = 0.03;
    var haltDirection;
    var speed = 10;

    //I use velocity and add it to the position of the boat, so it drifts more, like it should at sea
    var velocity = new THREE.Vector3();

    this.Update = function (positionOffset, rotationOffset, deltaTime) {
        if (this.collider) {
            var moveDirection = new THREE.Vector3();
            this.collider.getWorldDirection(moveDirection);

            //slow the boat down when you stop giving input
            if (positionOffset == 0 && haltDirection != null) {
                slowdown = 0.99;
                velocity.setZ(velocity.z * slowdown);
                velocity.setX(velocity.x * slowdown);
            }

            //add the velocity based on input 
            else {
                slowdown = -positionOffset;
                haltDirection = moveDirection;

                velocity.setZ(velocity.z + moveDirection.z * -positionOffset);
                velocity.setX(velocity.x + moveDirection.x * -positionOffset);
            }

            //clamp the length to control the speed.
            //We don't do a usual clamp, because that would result eventually in moving only in degrees of 90.
            velocity.clampLength(-0.01, 0.01);

            // physicsBody.AddVelocity(velocity);
            // this.collider.rotateY(rotationOffset);

            console.log(deltaTime);
            boatBox.torque = -rotationOffset * boatBox.density * deltaTime * 150;
            // Matter.Body.rotate(boatBox,-rotationOffset);
            console.log(boatBox.angle);
            this.collider.rotation.set(0,-boatBox.angle + Math.PI/2, 0);

            // console.log(moveDirection.z * -positionOffset / 10000);
            // console.log(boatBox.velocity);
            Matter.Body.applyForce(boatBox, boatBox.position, {x: Math.cos(boatBox.angle) * -positionOffset * boatBox.mass * deltaTime * speed, y: Math.sin(boatBox.angle) * -positionOffset * boatBox.mass * deltaTime * speed});


            this.collider.position.set(boatBox.position.x / 10, this.collider.position.y, boatBox.position.y / 10);
            //console.log(moveDirection);
        }
    }

    var cameraMoveBooleandown;
    var cameraMoveBooleanmove;
    this.PointerDownEvent = function() 
    { 
        cameraMoveBooleandown = true;
        // console.log("more mouseclick");
    };

    this.PointerMoveEvent = function() 
    { 
        if(cameraMoveBooleandown){
        cameraMoveBooleanmove = true;
        }
    };

    this.PointerUpEvent = function() 
    { 
        if(!cameraMoveBooleanmove){
            cameraMoveBooleandown = false;
        }
    };

    //The camera will stay with the boat.
    //I'll have to change this when the player is close to an island to see info better.
    this.UpdateCameraPos = function (camera, currentlyPressedKey) {
        if (this.model && (!cameraMoveBooleandown && !cameraMoveBooleanmove)) {
            camera.position.lerp(new THREE.Vector3(this.collider.position.x, this.collider.position.y + 10, this.collider.position.z - 10), 0.1);
            // camera.position.x = this.collider.position.x;
            // camera.position.y = this.collider.position.y + 10;
            // camera.position.z = this.collider.position.z - 10;
        }        

        if(currentlyPressedKey == 87 || currentlyPressedKey == 65 || currentlyPressedKey == 83 || currentlyPressedKey == 68
            || currentlyPressedKey == 38 || currentlyPressedKey == 40 || currentlyPressedKey == 39 || currentlyPressedKey == 37){
            cameraMoveBooleandown = false;
            cameraMoveBooleanmove = false;
        }
    }

    var Clouds = [];
    this.Initialize = function(){
        //this.GenerateCloud();
        this.model.position.set(-0.08,-0.5,0);
        this.collider.rotateY(Math.PI/2);   
        this.collider.position.set(0,0.6,0);
    }

    this.GenerateCloud = function(){
        if(cloudObjectPool.CheckInActivePoolLength() == 0){
            console.log("objectpool is empty");
        }
        var singleCloud = cloudObjectPool.TakeFromPool();
        var startPosition = this.collider.position;
        var direction = new THREE.Vector3();
        this.collider.getWorldDirection(direction);
        startPosition = new THREE.Vector3(startPosition.x + direction.x * 0.8, startPosition.y + 1.5, startPosition.z + direction.z * 0.8);

        singleCloud.ResetAnimation(startPosition);

        Clouds.push(singleCloud);
    }

    var cloudclock = 0;

    this.animate = function(clock) {
        // animation with THREE.AnimationMixer.update(timedelta)
        // var delta = clock.getDelta();       
        // if (mixer) {
        //     action = mixer.clipAction(this.model.animations[0]);
        //     mixer.update(delta);
        //     console.log(action);
        // }
        for (let i = 0; i < Clouds.length; i++){
            if(Clouds[i]){
                Clouds[i].AnimateCloud();
        
                if(Clouds[i].CheckOpacity() <= 0){
                    cloudObjectPool.ReturnToPool(Clouds[i]);
                    Clouds.shift();
                    }
                }
        }

        cloudclock += 0.005;

        if(cloudclock >= 0.5){
            if(this.model){
            this.GenerateCloud();
            }
            cloudclock = 0;
        }
    }
}
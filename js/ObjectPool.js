function ObjectPool(){

    const activePool = [];
    const inActivePool = []
    this.ReturnToPool = function(object){
        activePool.splice(object);

        // console.log('adding item to pool, pool size is ' + inActivePool.length);
        inActivePool.push(object);
        // console.log('added item to pool, pool size is ' + inActivePool.length);
    }

    this.TakeFromPool = function(){
        if(inActivePool.length > 0){
            var grabbedObject = inActivePool.shift();
            activePool.push(grabbedObject);
            return grabbedObject;
        }

        if(inActivePool.length == 0){
            console.error("There are no items in the pool.");
        }
    }

    this.CheckInActivePoolLength = function(){
        return inActivePool.length;
    }
}
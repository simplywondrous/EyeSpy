

var EyeSpy = function (element) {
   
    this.element = element;
    this.objects = null;
    this.image = null;
    //add any other properties that you need here. 

}

/*
    initialize game with the given info.
    (picture, hotspots, etc ) are contained in the gameObject
*/
EyeSpy.prototype.SetGame = function (/*gameObject*/) { //for now just hardcore the game in here. 

    var winHeight = window.innerHeight;
    var winWidth = document.body.clientWidth;
    
    //Get Menu
    var box = document.getElementById('menu');
    
    //initialize objects
    this.objects = [];
    this.objects.push(new GameObject("Crayon", 0));
    
    //initialize image
        //TODO not like it'll matter with new UI but grrr why is image always a bit too big?
    var bgCanvas = document.getElementById('canvas');
    bgCanvas.id = "canvas";
    bgCanvas.width = winWidth;
    bgCanvas.height = winHeight;
    bgCanvas.style.left = "0px";
    bgCanvas.style.top = "50px";
    bgCanvas.style.position = "absolute";
    var ctx = bgCanvas.getContext('2d');
    
    var invisCan = document.getElementById("layer");
    invisCan.id = "invisCan";
    invisCan.width = bgCanvas.width;
    invisCan.height = bgCanvas.height;
    invisCan.style.left = "0px";
    invisCan.style.top = "50px";
    invisCan.style.position = "absolute";
    var invisCtx = invisCan.getContext('2d');
    
    var bg = new Image();
    //gahhhhh scaling (and take into account UI later)
    var bgWidth = winWidth;
    var bgHeight = bgWidth * winHeight / winWidth;
    bg.onload = function() {
        ctx.drawImage(bg, 0, 0, bgWidth, bgHeight);
    }
    bg.src = "../imgs/bg.jpg"; 
    
    invisCtx.globalAlpha = 0;
    var layer = new Image();
    layer.onload = function() {
        invisCtx.drawImage(layer, 0, 0, bgWidth, bgHeight);
    }
    layer.src = "../imgs/layer.png";
    
    //initialize any other properties that you need here. 
    

}




/*
    Returns Object position is contained within
    returns GameObject if inside, null otherwise.
*/
EyeSpy.prototype.GetObjectAt = function (position) {

    //return object position is inside of. 
    
    return null;//no object found
}




EyeSpy.prototype.UpdateUI = function () {
    
    
    //update code ie
    /*
        for every object in this.objects
            if(object.isFound) ApplyStriketoElement()
            else DontDoAStrike()
    */
}

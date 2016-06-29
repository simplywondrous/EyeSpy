

var EyeSpy = function (gameInfo) {
    this.objArr = gameInfo.objects;
    this.bgSrc = gameInfo.background; 
    this.invisSrc = gameInfo.hotspots;
    //add any other properties that you need here. 
}

/*
    initialize game with the given info.
    (picture, hotspots, etc ) are contained in the some big json thing with all info necessary
*/

EyeSpy.prototype.SetGame = function () {

    var winHeight = window.innerHeight;
    var winWidth = document.body.clientWidth;
    
    //Get Menu
    var box = document.getElementById('menu');
    
    //initialize image
        //TODO not like it'll matter with new UI but grrr why is image always a bit too big?
    var bgCanvas = document.getElementById('canvas');
    this.bgCanvas = bgCanvas;
    bgCanvas.id = "canvas";
    bgCanvas.width = winWidth;
    bgCanvas.height = winHeight;
    bgCanvas.style.left = "0px";
    bgCanvas.style.top = "50px";
    bgCanvas.style.position = "absolute";
    var bgCtx = bgCanvas.getContext('2d');
    this.bgCtx = bgCtx;
    
    //globalAlpha doesn't work correctly and corrupts rgba data, so workaround
    var invisCan = document.createElement('canvas');
    //var invisCan = document.getElementById('layer');
    this.invisCan = invisCan;
    invisCan.id = "invisCan";
    invisCan.width = bgCanvas.width;
    invisCan.height = bgCanvas.height;
    invisCan.style.left = "0px";
    invisCan.style.top = "50px";
    invisCan.style.position = "absolute";
    var invisCtx = invisCan.getContext('2d');
    this.invisCtx = invisCtx;
    
    var bg = new Image();
    //gahhhhh scaling (and take into account UI later)
    var bgWidth = winWidth;
    var bgHeight = bgWidth * winHeight / winWidth;
    bg.onload = function() {
        bgCtx.drawImage(bg, 0, 0, bgWidth, bgHeight);
    };
    bg.src = this.bgSrc;
    
    var imageData;
    var layer = new Image();
    
    //Have the outside code register a callback function, 
    //and have your onload() call that function with the imageData value.
    this.afterLoad = function() {
        invisCtx.drawImage(layer, 0, 0, bgWidth, bgHeight);
        imageData = invisCtx.getImageData(0, 0, invisCan.width, invisCan.height);
        this.imageData = imageData;
    };
    
    layer.onload = this.afterLoad.bind(this);
    layer.src = this.invisSrc;
    
    //So binds this to the current this, which is EyeSpy obj
    this.bgCanvas.addEventListener('click', this.GetObjectAt.bind(this));
    
    //initialize any other properties that you need here. 
    
};

/*
    Returns Object position is contained within
    returns GameObject if inside, null otherwise.
*/
EyeSpy.prototype.GetObjectAt = function (position) {
    var x = event.layerX;
    var y = event.layerY;
    
    var base = (y*(this.imageData.width*4)) + (x*4);
    var picRGB = this.imageData.data[base] + ',' + this.imageData.data[base+1] + 
                 ',' + this.imageData.data[base+2];
                 
    //console.log(x + ", " + y + ": " + picRGB);
    
    for ( var obj of this.objArr ) {
        if ( obj.rgb === picRGB ) {
            console.log(obj);
        }
    }

    //return object position is inside of. 
    return null; //no object found
}; 
    

EyeSpy.prototype.UpdateUI = function () {
    
    //update code ie
    /*
        for every object in this.objects
            if(object.isFound) ApplyStriketoElement()
            else DontDoAStrike()
    */
};

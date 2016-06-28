

var EyeSpy = function (gameInfo) {
    this.objArr = gameInfo.objects;
    this.bgSrc = gameInfo.background;  //gameInfo.bgSrc
    this.invisSrc = gameInfo.hotspots;
    //add any other properties that you need here. 
}

/*
    initialize game with the given info.
    (picture, hotspots, etc ) are contained in the some big json thing with all info necessary
*/
EyeSpy.prototype.SetGame = function () { //for now just hardcode the game in here. 

    var winHeight = window.innerHeight;
    var winWidth = document.body.clientWidth;
    
    //Get Menu
    var box = document.getElementById('menu');
    
    //initialize image
        //TODO not like it'll matter with new UI but grrr why is image always a bit too big?
    var bgCanvas = document.getElementById('canvas')
    this.bgCanvas = bgCanvas;
    bgCanvas.id = "canvas";
    bgCanvas.width = winWidth;
    bgCanvas.height = winHeight;
    bgCanvas.style.left = "0px";
    bgCanvas.style.top = "50px";
    bgCanvas.style.position = "absolute";
    var bgCtx = bgCanvas.getContext('2d');
    this.bgCtx = bgCtx;
    
    var invisCan = document.getElementById("layer");
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
    }
    bg.src = this.bgSrc
    
    //invisCtx.globalAlpha = 0.002;
    var layer = new Image();
    layer.onload = function() {
        invisCtx.drawImage(layer, 0, 0, bgWidth, bgHeight);
    }
    layer.src = this.invisSrc;
    
    //So binds this to the current this, which is EyeSpy obj
    this.invisCan.addEventListener('click', this.GetObjectAt.bind(this));
    
    //initialize any other properties that you need here. 
    

}

/*
    Returns Object position is contained within
    returns GameObject if inside, null otherwise.
*/
EyeSpy.prototype.GetObjectAt = function (position) {
    /*
        If alpha = 0.002 ends up not working
        Then save all pixel data of invisCanvas as huge array and perform lookup on the array
            (Would be made harder by how x, y needs to be calibrated with array 0,0 though)
    */
    //For now register that it's clicked spot in console
    
    //get mouse click, get clicked pixel data
    var x = event.layerX;
    var y = event.layerY;
    
    var pixel = this.invisCtx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var rgb = 'rgb(' + data[0] + ',' + data[1] +
                 ',' + data[2] + ')';
    /*
    if ( rgb == "rgb(255,0,0)" ) {
        console.log("Clicked");
    }*/
    
    for ( var obj of this.objArr ) {
        if ( obj.rgb == rgb ) {
            console.log(obj);
        }
    }

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



var EyeSpy = function (element) {
   
    this.element = element;
    this.objects = null;
    this.image = null;
    
    //add any other properties that you need here. 

}

/*
    initialize game with the given info.
    (picture, hotspots, etc ) are contained in the some big json thing with all info necessary
*/
EyeSpy.prototype.SetGame = function (objList, bgImage, invisImage) { //for now just hardcode the game in here. 

    var winHeight = window.innerHeight;
    var winWidth = document.body.clientWidth;
    this.objects = objList;
    
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
    var ctx = bgCanvas.getContext('2d');

    
    
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
        ctx.drawImage(bg, 0, 0, bgWidth, bgHeight);
    }
    bg.src = bgImage; 
    
    invisCtx.globalAlpha = 0.002;
    var layer = new Image();
    layer.onload = function() {
        invisCtx.drawImage(layer, 0, 0, bgWidth, bgHeight);
    }
    layer.src = invisImage;
    
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
    //http://stackoverflow.com/questions/22384423/canvas-corrupts-rgb-when-alpha-0
    
    So a few options - could have layer.png not displayed and just pull data from it based on x,y
        Would require x,y to be calculated with offset if bg.jpg is not at 0,0 though
        Unless it calculates x,y based on corner of canvas as 0,0?
        
        Could replace all pixels where rgb=000 with null
        
        Could just set alpha to 0.01? Smallest it goes without changing is 0.002
            Gonna just take this way for now.
            'Kay so while actual colored items are as is, everything transparent is still rgb=000
        
        Could have if rgb!=000 (transparent) and just avoid black
            Nevermind turns out if alpha = 0 rgb always gets changed to 0 as well.
    */
    //For now register that it's clicked spot in console
    
    //get mouse click, get clicked pixel data
    console.log(this)
    var x = event.layerX;
    var y = event.layerY;
    
    var pixel = this.invisCtx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var rgb = 'rgb(' + data[0] + ',' + data[1] +
                 ',' + data[2] + ')';
    
    if ( rgb == "rgb(255,0,0)" ) {
        console.log("Click");
    }
    
    //Hashmap!

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



var EyeSpy = function (gameInfo) {
    this.objArr = gameInfo.objects;
    this.bgSrc = gameInfo.background; 
    this.invisSrc = gameInfo.hotspots;
    //add any other properties that you need here. 
};

EyeSpy.prototype.Start = function() {
    var leftToLoad = 0;
    var imgList = [];
    
    this.afterAllLoaded = function() {
        for ( var obj of imgList ) {
            if ( obj.id == "refImage" ) this.refImage = obj.img;
            else if ( obj.id == "bg" ) this.bg = obj.img;
            else { this.layer = obj.img; }
        }
        this.SetGame.bind(this)();
    };
    
    this.onImageLoaded = function(){
    	leftToLoad--;
    	if(leftToLoad==0) this.afterAllLoaded();
    };
    
    this.addImage = function(name, src){
        leftToLoad++;
    	var image = new Image();
    	image.onload = this.onImageLoaded.bind(this);
    	image.src = src;
    	imgList.push({id: name, img: image});
    };
    this.addImage("refImage", this.bgSrc);
    this.addImage("bg", this.bgSrc);
    this.addImage("layer", this.invisSrc);
};

/**
 * 
 * Creates Menu, Draws Images
 * **Later will change to some JSON thing instead of GameInfo
 *   Maybe that's for the constructor though IDK.
 * 
 */
EyeSpy.prototype.SetGame = function () {
    //Canvas placed here to get border
    var bgCanvas = document.getElementById('canvas');
    var winHeight = window.innerHeight - parseInt(bgCanvas.style.borderTop)*2
                                       - parseInt(bgCanvas.style.margin);
    var winWidth = document.body.scrollWidth - parseInt(bgCanvas.style.borderLeft)*2;
    
    /*Populate Menu*/
    var menu = document.getElementById('menuItems');
    this.menu = menu;

    for ( var obj of this.objArr ) {
        var entry = document.createElement('li');
        var count = "";
        var suffix = "";
        //well, if there's anything like fix it's gonna be fixs
        if ( obj.count > 1 ) { count = obj.count; suffix = "s"; }
        else { count = "a"; }
        entry.setAttribute("id", obj.name);
        entry.innerHTML = count + " " + obj.name + suffix;
        entry.classList.add("menuItem");
        menu.appendChild(entry);
    }
    
    /*Get Reference Image Aspects*/
    var ratio = Math.min(winWidth / this.refImage.naturalWidth, winHeight / this.refImage.naturalHeight);
    var bgWidth = this.refImage.naturalWidth*ratio; 
    var bgHeight = this.refImage.naturalHeight*ratio;
    
    /*Create Canvases*/
    this.bgCanvas = bgCanvas;
    bgCanvas.id = "canvas";
    bgCanvas.width = bgWidth;
    bgCanvas.height = bgHeight;
    bgCanvas.style.left = "0px";
    bgCanvas.style.top = "0px";
    bgCanvas.style.position = "absolute";
    var bgCtx = bgCanvas.getContext('2d');
    this.bgCtx = bgCtx;
    
    //globalAlpha doesn't work correctly and corrupts rgba data, so workaround
    var invisCan = document.createElement('canvas');
    this.invisCan = invisCan;
    invisCan.id = "invisCan";
    invisCan.width = bgCanvas.width;
    invisCan.height = bgCanvas.height;
    invisCan.style.left = bgCanvas.style.left;
    invisCan.style.top = bgCanvas.style.top;
    invisCan.style.position = bgCanvas.style.position;
    var invisCtx = invisCan.getContext('2d');
    this.invisCtx = invisCtx;
    
    /*Draw Images onto Canvases*/
    bgCtx.drawImage(this.bg, 0, 0, bgWidth, bgHeight);
    invisCtx.drawImage(this.layer, 0, 0, bgWidth, bgHeight);
    var imageData = invisCtx.getImageData(0, 0, invisCan.width, invisCan.height);
    this.imageData = imageData;
    
    //I'm proud that the below code worked so I'm keeping it for now just to show Yusef
    //Yusef please compliment me
    //Have the outside code register a callback function, 
    //and have your onload() call that function with the imageData value.
    /*
    var imageData;
    var layer = new Image();
    this.afterLoad = function() {
        invisCtx.drawImage(layer, 0, 0, bgWidth, bgHeight);
        imageData = invisCtx.getImageData(0, 0, invisCan.width, invisCan.height);
        this.imageData = imageData;
    };
    layer.onload = this.afterLoad.bind(this);
    layer.src = this.invisSrc;
    */
    
    //So binds this to the current this, which is EyeSpy obj
    this.bgCanvas.addEventListener('click', this.GetObjectAt.bind(this));
    
    /*Draws Tiled Background*/
    Tiles(ratio);
};

/**
 * Gets object based on click and removes object
 * so clicking it again won't do anything
 */
EyeSpy.prototype.GetObjectAt = function (position) {
    var x = event.layerX - parseInt(this.bgCanvas.style.borderLeft);
    var y = event.layerY - parseInt(this.bgCanvas.style.borderTop);
    
    var base = (y*(this.imageData.width*4)) + (x*4);
    var picRGB = this.imageData.data[base] + ',' 
                + this.imageData.data[base+1] + ',' 
                + this.imageData.data[base+2];

    for ( var obj of this.objArr ) {
        for ( var index = 0; index < obj.count; index++ ) {
            if ( obj.rgb[index] == picRGB ) {
                console.log( obj.rgb.splice(index, 1) );
                //obj.rgb.splice(index, 1);
                obj.count--;
                this.UpdateUI(obj);
            }
        }
    }
}; 

/**
 * Menu text change only
 */
 EyeSpy.prototype.UpdateUI = function (obj) {
    var items = this.menu.children;
    for ( var item of items ) {
        if (item.getAttribute("id") == obj.name) {
            if ( obj.count == 0 ) { item.style.textDecoration = 'line-through'; }
            else {
                var suffix = "";
                var count = "";
                if ( obj.count > 1 ) { count = obj.count; suffix = "s"; }
                else { count = "a"; }
                item.innerHTML = count + " " + obj.name + suffix;
            }
        }
    }
};

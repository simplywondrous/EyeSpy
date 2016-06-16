

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
    
    //Init side bar
    
    var box = document.createElement('div');
    var boxHeight = boxWidth / 3;
    var boxWidth = winWidth;
    document.body.appendChild(box);
    
    //initialize objects
    
    this.objects = [];
    
    this.objects.push(new GameObject("Frog", 0));
    
    //initialize image
    
    //TODO not like it'll matter with new UI but grrr why is image always a bit too big?
    //That includes drawing image with canvas
    var canvas = document.getElementById('canvas');
    canvas.id = "canvas";
    canvas.width = winWidth;
    canvas.height = winHeight;
    //document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    
    var bg = new Image();
    //gahhhhh scaling (and take into account UI later)
    var bgWidth = winWidth;
    var bgHeight = bgWidth * winHeight / winWidth;
    bg.onload = function() {
        ctx.drawImage(bg, 0, 0, bgWidth, bgHeight);
    }
    bg.src = "../imgs/bg.jpg"; 
    
    
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

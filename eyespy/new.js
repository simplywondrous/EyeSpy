class EyeSpy {
    
    constructor(gameInfo) {
        this.objArr = gameInfo.objects;
        this.bgSrc = gameInfo.background; 
        this.invisSrc = gameInfo.hotspots;
    }
    
    Start() {
        
        var func = function () {
            
        }
            var promise = new Promise((resolve, reject) => {
            
        });
        
        
        var loadImage = (name) => {
            return new Promise((resolve, reject) => {
                
            })
        }
        
        
        
        var leftToLoad = 0;
        var imgList = [];
        
        var afterAllLoaded = function() {
            for ( var obj of imgList ) {
                if ( obj.id == "refImage" ) this.refImage = obj.img;
                else if ( obj.id == "bg" ) this.bg = obj.img;
                else { this.layer = obj.img; }
            }
            this.SetGame.bind(this)();
        };
        
        var onImageLoaded = function(){
        	leftToLoad--;
        	if(leftToLoad==0) afterAllLoaded();
        };
        
        var addImage = function(name, src){
            leftToLoad++;
        	var image = new Image();
        	image.onload = onImageLoaded.bind(this);
        	image.src = src;
        	imgList.push({id: name, img: image});
        };
        this.addImage("refImage", this.bgSrc);
        this.addImage("bg", this.bgSrc);
        this.addImage("layer", this.invisSrc);
    }
}

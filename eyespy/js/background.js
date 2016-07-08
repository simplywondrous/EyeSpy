
var Tiles = function (ratio) {
    
    var winHeight = window.innerHeight;
    var winWidth = document.body.scrollWidth;

    var canvas = document.getElementById('tiles');
    this.canvas = canvas;
    canvas.width = winWidth;
    canvas.height = winHeight;
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.position = "absolute";
    var ctx = canvas.getContext('2d');
    this.ctx = ctx;
    
    var bgCanvas = document.getElementById('canvas');
    this.bgCanvas = bgCanvas;
    var bgCtx = bgCanvas.getContext('2d');
    this.bgCtx = bgCtx;
    
    /*Calc how many squares based on squaresize, last row / col will be cut off*/
    //When ratio ~30% 120x120 looks good so ratio 100% ~40x10=400px
    var squareSize = 400*ratio;
    this.squareSize = squareSize;
    var cols = Math.floor(winWidth / squareSize) + 1;
    var rows = Math.floor(winHeight / squareSize) + 1;
    
    for ( var row = 0; row < rows; row++ ) {
        for ( var col = 0; col < cols; col++ ) {
            var randomX = Math.floor(Math.random() * (winWidth + 1));
            var randomY = Math.floor(Math.random() * (winHeight + 1));
            var pixel = bgCtx.getImageData(randomX, randomY, 1, 1);
            var data = pixel.data;
            var rgba = 'rgba(' + data[0] + ',' + data[1] +
                        ',' + data[2] + ',' + data[3] + ')';
            ctx.fillStyle = rgba;
            ctx.fillRect(col*squareSize, row*squareSize, squareSize, squareSize);
        }
    }
};
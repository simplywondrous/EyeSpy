
/*
var map = {
    key : value,
    key : value
}

var list = [
    item1,
    item2,
    item3
];


*/

var gameInfo = {
    background : "../imgs/bg.jpg",
    hotspots : "../imgs/layer.png",
    //array of objects so properties can be added on later
    objects : [
        { name : "crayon1", rgb : "rgb(255,0,0)" },
        { name : "crayon2", rgb : "rgb(254,0,0)" },
        { name : "crayon3", rgb : "rgb(253,0,0)" },
        { name : "crayon4", rgb : "rgb(252,0,0)" },
        { name : "crayon5", rgb : "rgb(251,0,0)" },
        { name : "crayon6", rgb : "rgb(250,0,0)" },
    ]
}

/*
Why can't setting objMap objects be here? Is it 'cause it needs to be run or something?
*/
var bgSrc = "../imgs/bg.jpg";
var layerSrc = "../imgs/layer.png";

var main = function () {
    

    var game = new EyeSpy(gameInfo); //how many arguments are right here.
        game.SetGame();
    
   // document.body.appendChild(game.element); uncomment once element is a object. 
}
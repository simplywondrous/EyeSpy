
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

//Best to differ rgb by at least five it seems, edges may vary one or two
var gameInfo = {
    background : "../imgs/bg.jpg",
    hotspots : "../imgs/layer.png",
    //array of objects so properties can be added on later
    objects : [
        { name : "crayon1", rgb : "255,0,0" },
        { name : "crayon2", rgb : "254,0,0" },
        { name : "crayon3", rgb : "253,0,0" },
        { name : "crayon4", rgb : "252,0,0" },
        { name : "crayon5", rgb : "251,0,0" },
        { name : "crayon6", rgb : "250,0,0" },
    ]
};


var main = function () {
    
    var game = new EyeSpy(gameInfo); //how many arguments are right here.
        game.SetGame();
    
   // document.body.appendChild(game.element); uncomment once element is a object. 
};
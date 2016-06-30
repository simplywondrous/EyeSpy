
/*
Map is just an object with properties
var map = {
    key : value,
    key : value
}
List is just an array (of objects)
var list = [
    item1,
    item2,
    item3
];
*/

//Best to differ rgb by at least five it seems, edges may vary one or two
//Differing by one works surprisingly well though
var gameInfo = {
    background : "../imgs/bg.jpg",
    hotspots : "../imgs/layer.png",
    //array of objects so properties can be added on later
    //All names must be unique, preferably singular
    objects : [
        { name: "crayon1", rgb: ["255,0,0"], count: 1 },
        { name: "crayon", rgb: ["254,0,0", "252,0,0"], count: 2 },
        { name: "crayon2", rgb: ["251,0,0"], count: 1 },
        { name: "crayon3", rgb: ["250,0,0"], count: 1 },
    ]
};


var main = function () {
    
    var game = new EyeSpy(gameInfo);
        game.Start();
};
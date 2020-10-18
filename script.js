/*eslint-env browser*/

var array1 = [];
var array2 = [];

var currentgenre = null;

var loaded = null;             

$(document).ready(function(){
    
    $("#placeholder").text("type a genre");
    
    
    $("#button").click(function(){
        
        var genre = $("#genre").val();
        
        if(genre !== currentgenre){
            selecttag(genre);
            currentgenre = genre;
        }else generator();
    });
});

function selecttag(tag) {
    
    array1 = [];
    array2 = [];
    
    $("#placeholder").text("Loading...");
    loaded = false;
    
    var req = $.getJSON("http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=" + tag + "&api_key=3cd12571266ede5f37845d3bf2c4b7dd&limit=1000&format=json", function(json) {
        $.each(json.topartists.artist, function(i, item) {
            var name = item.name;
            if(name.includes(' ') && !name.includes('(')){
                array1.push(name.substring(0, name.lastIndexOf(' ')));
                array2.push(name.substring(name.lastIndexOf(' ') + 1, name.length));               
            }
        });
    });
    
    req.done(function(){   
        $("#placeholder").text("");
        loaded = true;
        generator();
    });
}

function generator() {
    
    var randomNumber1 = parseInt(Math.random() * array1.length);
    var randomNumber2 = parseInt(Math.random() * array2.length);
    var name = array1[randomNumber1] + " " + array2[randomNumber2];

    if(loaded)$("#placeholder").text(name);   
}
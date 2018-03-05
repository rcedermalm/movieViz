function listmovies(data){
console.log("ye")

var movietitles = [];
	data.forEach(function(d){ 
		var t = d["movie_title"];
		if(typeof(t) == "string"){
			movietitles.push(t);
		}

});

$('#myList').on('click', 'li', function (){
    var w = $(this).attr('id');
    w= w.substring(1);
    //console.log(w);
    console.log(movietitles[parseInt(w)]);
    $(this).fadeOut(500);
});

    for(var i = 0; i < movietitles.length; i++){
        var id = "m"+i;
        var moviebtn ="<li class='list-group-item' id='"+id+"'>" + movietitles[i] +"</li>"; 

        $("#myList").append(moviebtn);
    }


}


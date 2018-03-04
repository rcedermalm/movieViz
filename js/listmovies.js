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
    console.log($(this).text());
    $(this).fadeOut(500);
});

    for(var i = 0; i < movietitles.length; i++){
        var id = "btn";
        var moviebtn ="<li class='list-group-item' id='"+id+"' value='"+i+"'>" + movietitles[i] +"</li>"; 

        $("#myList").append(moviebtn);
    }


}


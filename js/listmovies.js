var movietitles = [];

function listmovies(data){
	data.forEach(function(d){ 
		var t = d["movie_title"];
		if(typeof(t) == "string"){
			movietitles.push(t);
		}

});

$('#myList').on('click', 'li', function (){
    var w = $(this).attr('id');
    w= w.substring(1);
    var indexInDataArray = dataArray.findIndex(movie => movie === data[parseInt(w)]);
    if(indexInDataArray == -1){
        var worked = addMovie(data[parseInt(w)]);
        if(worked){
            d3.select("#m"+w).attr("class", "list-group-item list-item bg-danger text-white");
        }
    } else {
        removeMovie(indexInDataArray);
        removeHighlight(data[parseInt(w)].movie_title)
    }
});

    for(var i = 0; i < movietitles.length; i++){
        var id = "m"+i;
        var moviebtn ="<li class='list-group-item list-item' id='"+id+"'>" + movietitles[i] +"</li>"; 

        $("#myList").append(moviebtn);
    }


}

function searchWithEnter(e){
    if (e.keyCode == 13) {
        search();
    }
}

function search() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('search-bar');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myList");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

}

function removeHighlight(title){
    var index = movietitles.findIndex(movie_title => movie_title === title);
    d3.select("#m"+index).attr("class", "list-group-item list-item");
}


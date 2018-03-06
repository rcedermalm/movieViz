queue()
    .defer(d3.csv, 'data/IMDB_movies/imdb_movie_metadata.csv')
    .await(ready);

var view;
var table;
var app;
function ready(error, data){
	if(error) throw error;

	view = new viewport();

	data = preprocess(data);
	var list = new listmovies(data);
}

//Remove all data entries without a title
function preprocess(data){

	data.forEach(function(d){
	
		var t = d["movie_title"];
		var s = d["imdb_score"];
		var g = d["gross"];
		var dur = d["duration"];

		if(typeof(t) != "undefined"){
			t.trim();
			d["movie_title"] = t.slice(0, -1);
		}

		//Ta bort rating > 10
		if(typeof(t) == "undefined" || typeof(s) == "undefined" || g == "" || dur == "" || parseFloat(s) > 10){
			var i = data.indexOf(d);
			//Remove data point
			data.splice(i, 1); 
		}

	});
	return data;
}
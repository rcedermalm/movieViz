queue()
    .defer(d3.csv, 'data/IMDB_movies/imdb_movie_metadata.csv')
    .await(ready);

var view;
var table;
var app;
function ready(error, data){
	if(error) throw error;

	view = new viewport(data);
	app = new apple(data);
	console.log("Got into the ready function.");
	console.log("size: " + data.length);

	data = preprocess(data);
	console.log("processed size: " + data.length);
	
	var grossList = [];
	
	data.forEach(function(d){ 
		var t = d["movie_title"];
		var s = d.gross;
		
		grossList.push({movie_title: t, gross:s});;

	});
	
	//console.log(grossList);
	

	
	
	//Make some lists to test with, ex. top 50 (because sorting is dumb) by IMDB rating
	/*data.sort(function(a,b){
		if (a.gross < b.gross) //sort string descending
			return -1;
		if (a.gross > b.gross)
			return 1;
		return 0; //default return value (no sorting)
	})*/
	//console.log("After sorting");

	var top50 = data.slice(0, 50);

	var scores = [];
	data.forEach(function(d){ 
		var t = d["imdb_score"];
		console.log(typeof(t));
		if(typeof(t) != "undefined"){
			scores.push(t);
		}

	});
	
	
	table = new tablelens(grossList);

	//console.log(data);


}

//Remove all data entries without a title
function preprocess(data){

	data.forEach(function(d){
		//console.log(d);
		//console.log(d);
		/*Object.keys(d).forEach(function(key){
			var t = key;
			
			if(typeof(t) == 'undefined'){
				var i = data.indexOf(d);
				//Remove data point
				data.splice(i, 1); 	
			}
		});*/
		
		var t = d["movie_title"];
		var s = d["imdb_score"];

		if(typeof(t) != "undefined"){
			t.trim();
			d["movie_title"] = t.slice(0, -1);
		}
		
		//Ta bort rating > 10
		if(typeof(t) == "undefined" || typeof(s) == "undefined" || s.charAt(1) != "."){
			var i = data.indexOf(d);
			//Remove data point
			data.splice(i, 1); 
		}

	});
	return data;
}


/*
	var movietitles = [];
	data.forEach(function(d){ 
		var t = d["movie_title"];
		if(typeof(t) == "string"){
			t.trim();
			t = t.slice(0, -2); //Remove the ?? at the end of the titles
			movietitles.push(t);
		}

	});
	//console.log(movietitles);

	console.log("Movietitles: " + movietitles.length);*/

	/*movietitles.sort(function(a, b){
	var nameA=a.toLowerCase(), nameB=b.toLowerCase();
		if (nameA < nameB) //sort string ascending
			return -1;
		if (nameA > nameB)
			return 1;
		return 0; //default return value (no sorting)
	});*/
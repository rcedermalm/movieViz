queue()
    .defer(d3.csv, 'data/IMDB/imdb_movie_metadata.csv')
    .await(ready);

var view;

function ready(error, data){
	if(error) throw error;

	view = new viewport(data);
	console.log("Got into the ready function.");
	console.log(data.length);

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

	console.log("Movietitles: " + movietitles.length);
	data = preprocess(data);

	console.log(data);

	//Make some lists to test with, ex. top 50 (because sorting is dumb) by IMDB rating
	data.sort(function(a,b){
		if (a.imdb_score < b.imdb_score) //sort string descending
			return 1;
		if (a.imdb_score > b.imdb_score)
			return -1;
		return 0; //default return value (no sorting)
	})
	console.log("After sorting");

	var top50 = data.slice(0, 50);

	var scores = [];
	data.forEach(function(d){ 
		var t = d["imdb_score"];
		console.log(typeof(t));
		if(typeof(t) != "undefined"){
			scores.push(t);
		}

	});


	console.log(top50);


}

//Remove all data entries without a title
function preprocess(data){

	data.forEach(function(d){ 
		var t = d["movie_title"];
		var s = d["imdb_score"];

		if(typeof(t) != "undefined"){
			t.trim();
			d["movie_title"] = t.slice(0, -2);
		}
		if(typeof(t) == "undefined" || typeof(s) == "undefined" || s.charAt(1) != "."){
			var i = data.indexOf(d);
			//Remove data point
			data.splice(i, 1); 
		}

		
		

	});
	return data;
}


	/*movietitles.sort(function(a, b){
	var nameA=a.toLowerCase(), nameB=b.toLowerCase();
		if (nameA < nameB) //sort string ascending
			return -1;
		if (nameA > nameB)
			return 1;
		return 0; //default return value (no sorting)
	});*/
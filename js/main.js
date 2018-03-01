queue()
    .defer(d3.csv, 'data/IMDB/imdb_movie_metadata.csv')
    .await(ready);

var view;

function ready(error, data){
	if(error) throw error;

	view = new viewport(data);
	console.log("Got into the ready function.");
	console.log(data[0]);

	var movietitles = [];
	data.forEach(function(d){ 
		var t = d["movie_title"];
		if(typeof(t) == "string"){
			t.trim();
			t = t.slice(0, -2);
			movietitles.push(t);
		}

	});
	//console.log(movietitles);

	/*movietitles.sort(function(a, b){
	var nameA=a.toLowerCase(), nameB=b.toLowerCase();
		if (nameA < nameB) //sort string ascending
			return -1;
		if (nameA > nameB)
			return 1;
		return 0; //default return value (no sorting)
	});*/
	console.log(movietitles);
}

//Note:
// data: { movie_title, title_year, director_name, actor_1_name, actor_2_name, actor_3_name, language, country
//		   imdb_score, movie_imdb_link, budget, movie_facebook_likes, color, gross, genres, num_critic_for_reviews
//		   duration, num_voted_users, facenumber_in_poster, plot_keywords, num_user_for_reviews, content_rating
//		   aspect_ratio, director_facebook_likes, actor_1_facebook_likes, actor_2_facebook_likes, actor_3_facebook_likes, cast_total_facebook_likes}

//Create tables lenses

function tablelens(data){
	console.log("Found the table lens.");
	
	console.log(data);

	//The first property shall be the movie_title
	//Create a horizontal bar chart for each other property.
	nr_properties = Object.keys(data[0]).length

	for(var i = 1; i <nr_properties; i++){
		//Get the name of the current property to make into a bar chart
		var props = Object.getOwnPropertyNames(data[0]);
		var property = props[i];

		var div = '#lens' + i;
		var id = "chart"+i;

		// format the data, string -> int?
		data.forEach(function(d) {
			d[property] = +d[property];
		});
		
		data = data.sort(function (a, b) {
				return d3.ascending(a[property], b[property]);
			})
		
		// set the dimensions and margins of the graph
		var parentWidth = $(div).width();
		var margin = {top: 20, right: 20, bottom: 30, left: 40},
			width = parentWidth - margin.left - margin.right,
			height = 800 - margin.top - margin.bottom;
		
		
		// set the ranges
		var y = d3.scaleBand()
				  .range([height, 0])
				  .padding(0.1);
	
		var x = d3.scaleLinear()
				  .range([0, width]);
				  
		// append the svg object to the body of the page
		// append a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select(div).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("class",  "table-lens")
			.attr("id", id)
		  	.append("g")
			.attr("transform", 
				  "translate(" + margin.left + "," + margin.top + ")");
			
				  
				  
		
		
		 // Scale the range of the data in the domains
		x.domain([0, d3.max(data, function(d){ return d[property]; })])
		y.domain(data.map(function(d) { return d.movie_title; }));
		
		// append the rectangles for the bar chart
		svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
		  //.attr("x", function(d) { return x(d.gross); })
			.attr("width", function(d) {return x(d[property]); } )
			.attr("y", function(d) { return y(d.movie_title); })
			.attr("height", y.bandwidth());


		svg.append("text")
			.attr("x", (width / 2))             
			.attr("y", 0 - (margin.top / 2))
			.attr("text-anchor", "middle")  
			.style("font-size", "12px")
			.style("text-color", "white")
			.attr("class", "lenstitle") 
			.text(property);
	}



	
	


	
	  
	// add the x Axis
	/*svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x));
*/
	// add the y Axis
	//svg.append("g")
	//  .call(d3.axisLeft(y));
		  
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
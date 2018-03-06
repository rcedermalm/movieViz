var genres = ["Action", "Comedy", "Drama", "Fantasy", "Other"];
var colours = ["red", "orange", "blue", "green", "yellow"];
var dataArray = [];
var maximumMovies = 15;

function addMovie(d){
    if(dataArray.length < maximumMovies){
        dataArray.push(d);
        clearMovies();
        return true;
    } else {
        alert("You have to remove a movie first. Click on the movie you want to remove to remove it.");
        return false;
    }

}

function removeMovie(id){
    removeHighlight(dataArray[id].movie_title);
    dataArray.splice(id, 1);
    clearMovies();
}

function clearMovies(){
    var tooltipNode = document.getElementById("tooltip-info");
    tooltipNode.parentNode.removeChild(tooltipNode);
    var infoButtonNode = document.getElementById("info-button");
    infoButtonNode.parentNode.removeChild(infoButtonNode);
    var boxInfoNode = document.getElementById("box-info-popup");
    boxInfoNode.parentNode.removeChild(boxInfoNode);

    for(var i = 1; i <= maximumMovies; i++){
        var myNode = document.getElementById("col"+i);
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    viewport();
}


function viewport(){
    var view = '#viewport';
    var sidebar = '#sidebar';
    var width = height = 150;
    var opac = 0.4;

    if(dataArray.length == 0){
        document.getElementById('placeholder-text').style.display = "block";
    } else {
        document.getElementById('placeholder-text').style.display = "none";
    }

    var viewRect = document.getElementById('viewport').getBoundingClientRect();
    var left = viewRect.left;

    // Initalize box info
    var infoButton = d3.select(view).append("div")
        .attr("id", "info-button")
        .on("mouseover", handleMouseOverInfo)
        .on("mouseout", handleMouseOutInfo)
        .style("left", left);

    var boxInfo = d3.select(view).append("div")
        .attr("class", "box-info")
        .attr("id", "box-info-popup")
        .style("opacity", 0);
		


    //initialize tooltip
    var tooltip = d3.select(view).append("div")
        .attr("class", "tooltip")
        .attr("id", "tooltip-info")
        .style("opacity", 0);

    for(var i = 0; i < dataArray.length; i++){
        var id = "slot" + i;
        var grossSVG = grossToPoints(dataArray[i]); 
        var size = ratingToSize(dataArray[i]);
        var index = parseInt(id.charAt(4));

        var movie = d3.select("#col"+(i+1)).append("object")
            .attr("type", "image/svg+xml")
            .attr("data", grossSVG)
            .attr("width", size)
            .attr("height", size)
            .attr("id", id)
            .attr("class",  "movie")
            .attr("style", "pointer-events: none;");

        d3.select("#col"+(i+1))
            .on("mouseover", function(){      
				if(this.id.length == 5){
					var index = parseInt(this.id.charAt(3) + this.id.charAt(4)) - 1; 
				} else {
					var index = parseInt(this.id.charAt(3)) - 1; 
				}
                handleMouseOver(dataArray[index], index);
            })
            .on("mouseout", handleMouseOut)
            .on("click", function() {
                var index = parseInt(this.id.charAt(3)) - 1; 
                handleMouseClick(index);
            });

        var movieText = d3.select("#col"+(i+1))
            .append('div')
            .attr("class", "movie-text");
            
        movieText.append("div")
            .attr("class", "movie-title")
            .text(dataArray[i].movie_title );
        
        movieText.append('div')
            .attr("class", "movie-year")
            .text("(" + dataArray[i].title_year + ")");

        createBackground(dataArray[i], id, size);
    }

    // Handles what should happen when the mouse is over tbe info "button"
    function handleMouseOverInfo(){
        var viewSize = document.getElementById('viewport').getBoundingClientRect();
        var width = viewSize.width-400 + "px";
       // var height = viewSize.height + "px";

        boxInfo.transition()
            .duration(200)
            .style("opacity", 1);

        var htmlInfo =  "<div class='row'>" + 
                            "<div class='col' align='center'><p class='box-info-main-title'>Representation Information</p></div>" + 
                        "</div>" + 
                        "<div class='row'>" + 
                            "<div class='col' align='center'><p class='box-info-title'>Gross</p></div>" + 
                        "</div>" + 
                        "<div class='row'>" +
                            "<div class='col' align='center'><img src='images/5points.svg'><p class='box-info-value'>10M</p></div>" +
                            "<div class='col' align='center'><img src='images/7points.svg'><p class='box-info-value'>50M</p></div>" + 
                            "<div class='col' align='center'><img src='images/9points.svg'><p class='box-info-value'>200M</p></div>" +
                            "<div class='col' align='center'><img src='images/11points.svg'><p class='box-info-value'>>200M</p></div>" +
                        "</div>" + 
                        "<div class='row'>" + 
                            "<div class='col' align='center'><p class='box-info-title'>Genre</p></div>" + 
                        "</div>" + 
                        "<div class='row'>" +
                            "<div class='col' align='center'><img src='images/Red.svg'><p class='box-info-value'>Action</p></div>" +
                            "<div class='col' align='center'><img src='images/Orange.svg'><p class='box-info-value'>Comedy</p></div>" + 
                            "<div class='col' align='center'><img src='images/Blue.svg'><p class='box-info-value'>Drama</p></div>" +
                            "<div class='col' align='center'><img src='images/Green.svg'><p class='box-info-value'>Fantasy</p></div>" +
                            "<div class='col' align='center'><img src='images/Yellow.svg'><p class='box-info-value'>Other</p></div>" +
                        "</div>" +
                        "<div class='row'>" + 
                            "<div class='col' align='center'><p class='box-info-title'>IMDB score</p></div>" + 
                        "</div>" + 
                        "<div class='row'>" +
                            "<div class='col info-star-size' id='small' align='center'></div>" +
                            "<div class='col info-star-size' id='mid-small' align='center'></div>" + 
                            "<div class='col info-star-size' id='mid-large' align='center'></div>" +
                            "<div class='col info-star-size' id='large' align='center'></div>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<div class='col' align='center'><p class='box-info-value'>5.8</p></div>" +
                            "<div class='col' align='center'><p class='box-info-value'>6.6</p></div>" + 
                            "<div class='col' align='center'><p class='box-info-value'>7.3</p></div>" +
                            "<div class='col' align='center'><p class='box-info-value'>>7.3</p></div>" +
                        "</div>" + 
                        "<div class='row'>" + 
                            "<div class='col' align='center'><p class='box-info-title'>Duration</p></div>" + 
                        "</div>" + 
                        "<div class='row'>" +
                            "<div class='col' align='center'><p class='box-info-value'><svg width='10' height='10'><circle cx='5' cy='5' r='3' stroke='black' stroke-width='1' fill='white'></circle></svg> - Every circle around the stars represents 30 minutes of screen time.</p></div>" +
                        "</div>";

        boxInfo.attr("style", "width:" + width + ";pointer-events: none;")
            .html(htmlInfo)
    }

    // Handles what should happen when the mouse leaves the info "button"
    function handleMouseOutInfo() {
        boxInfo.transition()
            .duration(500)
            .style("opacity", 0);
    }
    
    function handleMouseClick(i){
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        removeMovie(i);
    }

    // Handles what should happen when the mouse is over a movie
    function handleMouseOver(d, i) {
        if(!dataArray[i]){
            return;
        }

        tooltip.transition()
            .duration(200)
            .style("opacity", .9);

        //var titleRect = document.getElementById('main-title').getBoundingClientRect();

        var boundRect = document.getElementById('col' + (parseInt(i)+1)).getBoundingClientRect();
        var boundRectFirstSlot =  document.getElementById('col1').getBoundingClientRect();
        var top = boundRect.y - boundRectFirstSlot.y + 50;
        var left = boundRect.x - boundRectFirstSlot.x;

        var infoHeight = boundRect.height;
        var infoWidth = boundRect.width;

        var extraInfo = "<p id='info-title'>" + dataArray[i].movie_title + "</p>" +
                        "<p id='info-genres'>" + d.genres + "</p>" + 
                        "<p class='info-key'>Director:</p><p class='info-value'>" + d.director_name + "</p>" +
                        "<p class='info-key'>Actors:</p><p class='info-value'>" + d.actor_1_name + ", " + d.actor_2_name + ", " + d.actor_3_name + "</p>" +
                        "<p class='info-key'>Gross:</p><p class='info-value'>" + fixGross(d) + " dollars</p>" + 
                        "<p class='info-key'>Duration:</p><p class='info-value'>" + d.duration + " minutes</p>" + 
                        "<p class='info-key'>IMDB score:</p><p class='info-value'>" + d.imdb_score + "</p>"; 

        tooltip.attr("style", "left:"+ left +"px;top:"+ top +"px; pointer-events: none;")
            .html("<div class='extra-info' id='extra" + i + "' style='height: " + infoHeight + "px; width: " + infoWidth + "px;'>" + extraInfo + "</div>");
    
    }

    // Returns a more compact and readable gross, eg. 215742875 => 215.7M
    function fixGross(d){
        var gross = parseInt(d.gross);
        if(gross >= 1000000){
            return "" + (gross/1000000).toFixed(1) + "M";
        } else if(gross >= 1000){
            return "" + (gross/1000).toFixed(1) + "K";
        } else {
            return d.gross;
        }
    }

    // Handles what should happen when the mouse leaves the movie
    function handleMouseOut() {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }

    // Returns the size for the SVG so that the size of the star
    // corresponds to the imdb score of the movie.
    function ratingToSize(dataPoint) {
        var rating = parseFloat(dataPoint.imdb_score);
        var size = 0;

        switch(true){
            case (rating < 5.8) : {
                size = 60;
                break;
            }
            case (rating < 6.6) : {
                size = 90;
                break;
            }
            case (rating < 7.3) : {
                size = 120;
                break;
            }
            case (rating >= 7.3) : {
                size = 150;
                break;
            }
        }
        return size;
    }

    // Returns the SVG string so the number of points of the star
    // corresponds to the gross of the movie.
    function grossToPoints(dataPoint){
        var gross = parseInt(dataPoint.gross);
        var grossSVG;

        switch(true){
            case (gross < 10000000) : {
                grossSVG = "images/5points.svg"
                break;
            }
            case (gross < 50000000) : {
                grossSVG = "images/7points.svg"
                break;
            }
            case (gross < 200000000) : {
                grossSVG = "images/9points.svg"
                break;
            }
            case (gross >= 200000000) : {
                grossSVG = "images/11points.svg"
                break;
            }
        }
        return grossSVG;
    }

    // Returns a trimmed version of the genres in the data.
    function trimGenres(genreString){
        var _genres = genreString.split("|");
        var trimmedGenres = [];
        var othersUsed = false;

        for(var i = 0; i < _genres.length; i++){
            var genreFound = genres.find(genre => genre === _genres[i]);
            if(genreFound){
                trimmedGenres.push(_genres[i]);
            }

            if(!genreFound && !othersUsed){
                trimmedGenres.push("Other");
                othersUsed = true;
            } 

        }
        return trimmedGenres;
    }

    // Sets the background image to coloured dots depending on how many genres there are and which. 
    // _genres: An array of strings, important that it has been preprocessed so that it only uses the following
    //          strings: "Action", "Comedy", "Drama", "Fantasy", "Thriller"
    // id:      The id of the object that should get the background image
    function createBackground(dataPoint, id, size){
        svgString = "<svg xmlns='http://www.w3.org/2000/svg' width='" + size + "' height='" + size + "'>";
        
        var _genres = trimGenres(dataPoint.genres)

        switch(_genres.length) {
            case 1: 
                svgString = svgString + oneGenre(_genres, size);
                break;
            case 2: 
                svgString = svgString + twoGenres(_genres, size);
                break;
            case 3: 
                svgString = svgString + threeGenres(_genres, size);
                break;
            case 4: 
                svgString = svgString + fourGenres(_genres, size);
                break;
            case 5: 
                svgString = svgString + fiveGenres(_genres, size);
                break;
        }

        svgString = svgString + durationToDots(dataPoint, size);

        svgString = svgString + "</svg>";
        var urlSVG = "data:image/svg+xml, " + svgString;
        $('#'+ id).css('background-image', 'url("' + urlSVG + '")');
    }

    // Returns SVG circles for one genre
    function oneGenre(_genre, size){
        var colour = getColours(_genre);
        return "<circle cx='" + size/2 + "' cy='" + size/2 + "' r='" + size/3.5 + "' opacity='" + opac + "' fill='" + colour[0] + "'></circle>"
    }

    // Returns SVG circles for two genres
    function twoGenres(_genres, size){
        var colour = getColours(_genres);
        return "<circle cx='" + size/2 + "' cy='" + size/2.5 + "' r='" + size/4.7 + "' opacity='" + opac + "' fill='" + colour[0] + "'></circle>" + 
               "<circle cx='" + size/2 + "' cy='" + 1.5 * size/2.5 + "' r='" + size/4.7 + "' opacity='" + opac + "' fill='" + colour[1] + "'></circle>";
    }

    // Returns SVG circles for three genres
    function threeGenres(_genres, size){
        var colour = getColours(_genres);
        return "<circle cx='" + size/3 + "' cy='" + size/2.5 + "' r='" + size/4.7 + "' opacity='" + opac + "' fill='" + colour[0] + "'></circle>" + 
               "<circle cx='" + 2 * size/3 + "' cy='" + size/2.5 + "' r='" + size/4.7 + "' opacity='" + opac + "' fill='" + colour[1] + "'></circle>" + 
               "<circle cx='" + size/2 + "' cy='" + 1.5 * size/2.5 + "' r='" + size/4.7 + "' opacity='" + opac + "' fill='" + colour[2] + "'></circle>";
    }
    // Returns SVG circles for four genres
    function fourGenres(_genres, size){
        var colour = getColours(_genres);
        return "<circle cx='" + size/2.5 + "' cy='" + size/2.5 + "' r='" + size/4.7 + "' opacity='" + opac + "' fill='" + colour[0] + "'></circle>" + 
               "<circle cx='" + 1.5 * size/2.5 + "' cy='" +  size/2.5 + "' r='" + size/4.7 + "' opacity='" + opac + "' fill='" + colour[1] + "'></circle>" + 
               "<circle cx='" + size/2.5 + "' cy='" + 1.5 * size/2.5 + "' r='" + size/4.7 + "' opacity='" + opac + "' fill='" + colour[2] + "'></circle>" + 
               "<circle cx='" + 1.5 * size/2.5 + "' cy='" + 1.5 * size/2.5 + "' r='" + size/4.7 + "' opacity='" + opac + "' fill='" + colour[3] + "'></circle>";
    }

    // Returns SVG circles for five genres
    function fiveGenres(_genres, size){
        var colour = getColours(_genres);
        return "<circle cx='" + size/2 + "' cy='" + size/2.8 + "' r='" + size/6 + "' opacity='" + opac + "' fill='" + colour[0] + "'></circle>" + 
               "<circle cx='" + size/2.8 + "' cy='" + size/2 + "' r='" + size/6 + "' opacity='" + opac + "' fill='" + colour[1] + "'></circle>" + 
               "<circle cx='" + 1.8 * size/2.8 + "' cy='" +  size/2 + "' r='" + size/6 + "' opacity='" + opac + "' fill='" + colour[2] + "'></circle>" + 
               "<circle cx='" + size/2.3 + "' cy='" + 1.8 * size/2.8 + "' r='" + size/6 + "' opacity='" + opac + "' fill='" + colour[3] + "'></circle>" + 
               "<circle cx='" + 1.35 * size/2.3 + "' cy='" + 1.8 * size/2.8 + "' r='" + size/6 + "' opacity='" + opac + "' fill='" + colour[4] + "'></circle>";
    }

    // Returns the colours for the different given genres
    function getColours(_genres){
        var _colours = [];
        
        for(var i = 0 ; i < _genres.length; i++){
            _colours[i] = colours[genres.findIndex(genre => genre === _genres[i])];
        }
        return _colours;
    }

    // Returns the SVG string so the number of circles around the star
    // corresponds to the duration of the movie (One dot per half an hour)
    function durationToDots(dataPoint, size){
        var duration = parseInt(dataPoint.duration);
        var positions = createSmallDotArray(size);
        var svgString;

        for(var i = 30; i < 360; i = i+30){
            if(duration > i){
                var index = Math.floor(Math.random()*positions.length);
                svgString = svgString + positions[index];
                positions.splice(index,1);
            } else {
                break;
            }
        }

        return svgString;
    }

    // Creates the array used for creating the "small circle" - array for the durationToDots function
    function createSmallDotArray(size){
        var positions = [];
        positions.push("<circle cx='" + 0.38 * size + "' cy='" + 0.04 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>");
        positions.push("<circle cx='" + 0.14 * size + "' cy='" + 0.16 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>");      
        positions.push("<circle cx='" + 0.04 * size + "' cy='" + 0.39 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>"); 
        positions.push("<circle cx='" + 0.04 * size + "' cy='" + 0.61 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>");
        positions.push("<circle cx='" + 0.38 * size + "' cy='" + 0.96 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>");
        positions.push("<circle cx='" + 0.14 * size + "' cy='" + 0.84 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>");
        positions.push("<circle cx='" + 0.62 * size + "' cy='" + 0.04 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>");
        positions.push("<circle cx='" + 0.86 * size + "' cy='" + 0.16 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>");      
        positions.push("<circle cx='" + 0.96 * size + "' cy='" + 0.39 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>"); 
        positions.push("<circle cx='" + 0.96 * size + "' cy='" + 0.61 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>");
        positions.push("<circle cx='" + 0.62 * size + "' cy='" + 0.96 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>");
        positions.push("<circle cx='" + 0.86 * size + "' cy='" + 0.84 * size + "' r='" + size/30 + "' stroke='DarkSlateGray' stroke-width='" + size/75 + "' fill='white'></circle>");
    
        return positions;
    }
}
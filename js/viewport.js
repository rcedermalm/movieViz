var genres = ["Action", "Comedy", "Drama", "Fantasy", "Thriller"];
var colours = ["red", "yellow", "blue", "green", "purple"];

function viewport(data){

    var view = '#viewport';
    var width = 150;
    var height = 150;
    var opac = 0.3;

    d3.select(view).append("object")
    .attr("type", "image/svg+xml")
    .attr("data", "SVG/7points.svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "hej");

    colourDots(["Drama", "Action", "Comedy", "Thriller", "Fantasy"], "hej");


    // Sets the background image to coloured dots depending on how many genres there are and which. 
    // _genres: An array of strings, important that it has been preprocessed so that it only uses the following
    //          strings: "Action", "Comedy", "Drama", "Fantasy", "Thriller"
    // id:      The id of the object that should get the background image
    function colourDots(_genres, id){
        svgString = "<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'>";
        
        switch(_genres.length) {
            case 1: 
                svgString = svgString + oneGenre(_genres);
                break;
            case 2: 
                svgString = svgString + twoGenres(_genres);
                break;
            case 3: 
                svgString = svgString + threeGenres(_genres);
                break;
            case 4: 
                svgString = svgString + fourGenres(_genres);
                break;
            case 5: 
                svgString = svgString + fiveGenres(_genres);
                break;
        }

        svgString = svgString + "</svg>";
        var urlSVG = "data:image/svg+xml, " + svgString;
        $('#'+ id).css('background-image', 'url("' + urlSVG + '")');
    }

    // Returns SVG circles for one genre
    function oneGenre(_genre){
        var colour = getColours(_genre);
        return "<circle cx='" + width/2 + "' cy='" + height/2 + "' r='40' opacity='" + opac + "' fill='" + colour[0] + "'></circle>"
    }

    // Returns SVG circles for two genres
    function twoGenres(_genres){
        var colour = getColours(_genres);
        return "<circle cx='" + width/2 + "' cy='" + height/2.5 + "' r='32' opacity='" + opac + "' fill='" + colour[0] + "'></circle>" + 
               "<circle cx='" + width/2 + "' cy='" + 1.5 * height/2.5 + "' r='32' opacity='" + opac + "' fill='" + colour[1] + "'></circle>";
    }

    // Returns SVG circles for three genres
    function threeGenres(_genres){
        var colour = getColours(_genres);
        return "<circle cx='" + width/3 + "' cy='" + height/2.5 + "' r='32' opacity='" + opac + "' fill='" + colour[0] + "'></circle>" + 
               "<circle cx='" + 2 * width/3 + "' cy='" + height/2.5 + "' r='32' opacity='" + opac + "' fill='" + colour[1] + "'></circle>" + 
               "<circle cx='" + width/2 + "' cy='" + 1.5 * height/2.5 + "' r='32' opacity='" + opac + "' fill='" + colour[2] + "'></circle>";
    }
    // Returns SVG circles for four genres
    function fourGenres(_genres){
        var colour = getColours(_genres);
        return "<circle cx='" + width/2.5 + "' cy='" + height/2.5 + "' r='32' opacity='" + opac + "' fill='" + colour[0] + "'></circle>" + 
               "<circle cx='" + 1.5 * width/2.5 + "' cy='" +  height/2.5 + "' r='32' opacity='" + opac + "' fill='" + colour[1] + "'></circle>" + 
               "<circle cx='" + width/2.5 + "' cy='" + 1.5 * height/2.5 + "' r='32' opacity='" + opac + "' fill='" + colour[2] + "'></circle>" + 
               "<circle cx='" + 1.5 * width/2.5 + "' cy='" + 1.5 * height/2.5 + "' r='32' opacity='" + opac + "' fill='" + colour[3] + "'></circle>";
    }

    // Returns SVG circles for five genres
    function fiveGenres(_genres){
        var colour = getColours(_genres);
        return "<circle cx='" + width/2 + "' cy='" + height/2.8 + "' r='25' opacity='" + opac + "' fill='" + colour[0] + "'></circle>" + 
               "<circle cx='" + width/2.8 + "' cy='" + height/2 + "' r='25' opacity='" + opac + "' fill='" + colour[0] + "'></circle>" + 
               "<circle cx='" + 1.8 * width/2.8 + "' cy='" +  height/2 + "' r='25' opacity='" + opac + "' fill='" + colour[1] + "'></circle>" + 
               "<circle cx='" + width/2.3 + "' cy='" + 1.8 * height/2.8 + "' r='25' opacity='" + opac + "' fill='" + colour[2] + "'></circle>" + 
               "<circle cx='" + 1.35 * width/2.3 + "' cy='" + 1.8 * height/2.8 + "' r='25' opacity='" + opac + "' fill='" + colour[3] + "'></circle>";
    }

    // Returns the colours for the different given genres
    function getColours(_genres){
        var _colours = [];
        
        for(var i = 0 ; i < _genres.length; i++){
            _colours[i] = colours[genres.findIndex(genre => genre === _genres[i])];
        }
        return _colours;
    }

}
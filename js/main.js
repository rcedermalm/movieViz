queue()
    .defer(d3.csv, 'data/IMDB/imdb_movie_metadata.csv')
    .await(ready);

function ready(error, data){
if(error) throw error;

  console.log("Got into the ready function.");
  console.log(data[1]);
}

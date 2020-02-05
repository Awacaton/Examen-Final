let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;


let movieCollection = mongoose.Schema({

    film_ID : uuid(),
    film_title : {type: String},
    year : { type: Number},
    rating :{ type: Number}

});


let Movie = mongoose.model( "movies", movieCollection );

let movieList = {
    getAll : function() {
        return Movie.find()

        .then(movies =>{
            return movies;

        })
        .catch( error => {
            throw Error (error);
        });
    }
};
module.exports = {
    movieCollection
    
};
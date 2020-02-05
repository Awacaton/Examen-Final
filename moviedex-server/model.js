let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;


let movieCollection = mongoose.Schema({

    film_ID : uuid(),
    film_title : {type: String},
    year : { type: Number},
    rating :{ type: Number}

});


let Movies = mongoose.model( "movies", movieCollection );

let movieCollection = {
    getAll : function() {
        return Movies.find()

        .then(Movies =>{
            return Movies;

        })
        .catch( error => {
            throw Error (error);
        });
    }
};
module.exports = {
    movieCollection
    
};
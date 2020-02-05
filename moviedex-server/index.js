let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );

let app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

app.get("/api/moviedex" , (req,res)=>{

	MovieColletion.getAll()
    .then(MovieColletion =>{
		return res.status(200).json(MovieColletion);
    })
    .catch( error => {
        console.log(error);
		return res.status(500).send("Error para mostrar peliculas");
    });

});


app.post("/api/moviedex", jsonParser , (req,res) =>{

	let titulo = req.body.film_ID;
	let year = req.body.year;
	let rating = req.body.rating;
	
	let nuevaPelicula =  { 
		film_ID : uuid(),
		film_title : title,
		year : year,
		rating : rating

	}

	MovieColletion.create(nuevaPelicula);
	
    .then(nuevaPelicula =>{
		if(titulo != "" && year != "" && rating != ""){
			return res.status(201).json(nuevaPelicula);

		}else{
			return  res.status(406).send("Falta algun elemento");

		}
    }).catch( error => {
        console.log(error);
		return res.status(500).send("Error para mostrar peliculas");
    });


});



let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}
var mysql = require( "mysql" );

var connectionpool = mysql.createPool({
	connectionLimit : 50, //Par défault : 10
    host     : 'V-ORADIO-BDD',
    user     : 'apiradioselect',
    password : 'apiradioselect',
    database : 'apiradio'
  });

exports.list = function(req, res){
  console.log("I am there");
  res.send("respond with a resource");
};

exports.findByName = function(req, res){
	connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } 
        else{
        	res.setHeader('Content-Type', 'text/plain'); 
            queryString = 'SELECT * FROM radios WHERE slug=' + "'" + req.params.name + "'";
            connection.query(queryString, function select(error, results, fields) {
                if (error) {
                  return;
                }
                if ( results.length > 0 )  { 
                    res.json(results);
                } else {
                  console.log("Pas de données");
                  res.send("Pas de données correspondant à " + req.params.name);
                }
                queryString = "";	        	
                connection.release();  
            });
        }
 });
};

exports.findByLanguage = function(req, res){
	connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } 
        else{
        	res.setHeader('Content-Type', 'text/plain'); 
            queryString = 'SELECT * FROM radios WHERE language=' + "'" + req.params.language + "'";
            console.log(queryString);
            connection.query(queryString, function select(error, results, fields) {
                if (error) {
                  return;
                }
                if ( results.length > 0 )  { 
                    res.json(results);
                } else {
                  console.log("Pas de données");
                  res.send("Pas de données correspondant à " + req.params.language);
                }
                queryString = "";	        	
                connection.release();  
            });
        }
 });
};
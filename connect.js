require('dotenv/config');
const mysql = require('mysql');


const con 	= mysql.createConnection ({
	
	host	: https://remotemysql.com/,
	user	: kRvQIndd7l,
	password: rQ1RJ0R5lY,
	database: kRvQIndd7l
})

con.connect(function(error){
	if(error) throw error;
})
module.exports=con;

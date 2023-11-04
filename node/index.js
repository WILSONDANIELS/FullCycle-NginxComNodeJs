const express = require('express')
const app = express()
const port = 3000

const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

//connection.query("insert into people(name) values ('Wilson')")
//connection.query("insert into people(name) values ('Ana')")
//connection.query("insert into people(name) values ('Maite')")
//connection.query("insert into people(name) values ('Murilo')")

var datas = "";

connection.query("SELECT * FROM people", function (err, result, fields) {
	if (err) throw err;
	result.forEach(element => {
		datas = datas + (element.id + "-" + element.name + '<br/>');
	});
});

connection.end()

app.get('/', (req,res) => {
	res.send('<h1>Full Cycle Rocks!</h1><p>Lista de nomes cadastrada no banco de dados.</p><p>'
	+ datas + '</p>')
})

app.listen(port, ()=> {
	console.log('Rodando na porta '+ port)
})
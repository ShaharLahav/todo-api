var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet dad for lunch',
	completed: false
},{
	id: 2,
	description: 'Go to market',
	completed: false
},
{
	id: 3,
	description: 'Learn NodeJs',
	completed: true
}];

app.get('/' , function (req, res) {
	res.send('Todo API Root');
});

app.get('/todos' , function (req , res) {
	res.json(todos);
});

app.get('/todos/:id' , function (req , res) {
	var todoID = parseInt(req.params.id , 10);
	var index;
	for (var i = 0; i < todos.length; i++) 
	{
		if(todos[i].id === todoID)
			index = i;
	}
	if(typeof index === 'undefined')
		res.status(404).send();
	else
	{
		res.json(todos[index]);
	}
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});
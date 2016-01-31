var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/' , function (req, res) {
	res.send('Todo API Root');
});

app.get('/todos' , function (req , res) {
	res.json(todos);
});

app.get('/todos/:id' , function (req , res) {
	var todoID = parseInt(req.params.id , 10);
	var matched = _.findWhere(todos, {id: todoID});
	if(typeof matched === 'undefined')
		res.status(404).send();
	else
	{
		res.json(matched);
	}
});

app.post('/todos' , function (req , res) {
	var body = _.pick(req.body, 'description' , 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0)
	{
		return res.status(400).send();
	}
	

	body.description = body.description.trim();

	var addToDo = body;
	addToDo.id = todoNextId++;
	todos.push(addToDo);
	console.log('description: ' + body.description);

	res.json(body);
});

app.delete('/todos/:id' , function (req,res)
{
	var todoID = parseInt(req.params.id , 10);
	var matched = _.findWhere(todos, {id: todoID});
	if(matched !== undefined)
		{
			todos = _.without(todos, matched);
			res.json(matched);
		}
	else
		res.status(400).json({"Error": "no todo found"});
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});
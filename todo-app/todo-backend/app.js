const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const redis = require('./redis');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.get('/statistics', async (_, res) => {
  const addedTodos = Number(await redis.get('added_todos')) || 0;
  res.json({ added_todos: addedTodos });
});

app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;

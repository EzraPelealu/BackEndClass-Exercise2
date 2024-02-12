const express = require('express');
const morgan = require('morgan');
const members = require('./members');
const users = require('./users');

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send('This is the homepage');
});

app.get('/about', (req, res) => {
  const response = {
    status: 'success',
    massage: 'response success',
    description: 'Exercise #03',
    date: new Date().toISOString(),
    data: members
  };
  res.status(210).json(response);
});

app.get('/users', (req, res) => {
  const response = {
    status: 'success',
    massage: 'response success',
    description: 'Exercise #03',
    date: new Date().toISOString(),
    data: users
  };
  res.status(220).json(response);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const morgan = require('morgan');
const users = require('./users');

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));

// Endpoint untuk mendapatkan list data users
app.get('/users', (req, res) => {
    res.json(users);
});

// Endpoint untuk mendapatkan data user berdasarkan nama
app.get('/users/:name', (req, res, next) => {
    const { name } = req.params;
    const user = users.find(user => user.name.toLowerCase() === name.toLowerCase());
    if (!user) {
      const error = new Error('Data user tidak ditemukan');
      error.status = 404;
      return next(error);
    }
    res.json(user);
});

// Middleware untuk menangani error 404
app.use((req, res, next) => {
  const error = new Error('Resource tidak ditemukan');
  error.status = 404;
  next(error);
});

// Middleware untuk menangani error lainnya
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Terjadi kesalahan pada server',
  });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

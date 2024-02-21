const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const app = express();

// Middleware for request body using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static('public'));

// Middleware for file upload using multer
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res, next) => {
  // handle the upload here
});

// Middleware for handling CORS
app.use(cors());

// Define routes here
app.get('/', (req, res, next) => {
  res.send('Hello World! I am Ezra!');
});

app.listen(port, () => {
  console.log(`Server berjalan pada ${port}`);
});

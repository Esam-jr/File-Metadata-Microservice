const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Import multer for file uploads
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be temporarily stored in the 'uploads/' folder

// POST endpoint for file uploads
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extract file metadata
  const { originalname: name, mimetype: type, size } = req.file;

  // Return the file metadata in the JSON response
  res.json({
    'name':name,
    'type':type,
    'size':size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces');
require('./connect');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

//multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/images'); //directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); //unique filename for each uploaded file
  },
});

const upload = multer({ storage: storage });

//use multer middleware to handle file uploads
app.use(upload.single('image')); //'image' is the field name in the request body

app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/', sauceRoutes);

module.exports = app;

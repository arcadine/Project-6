const jwt = require("jsonwebtoken");
const { secretKey } = require("./controllers/user");

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    console.log(token.split(" ")[1]);
    //verify the token
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    
    //attach the decoded user information to the request object
    req.user = decoded;

    //move to the next middleware
    next();
  } 
  catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

//multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images'); //directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); //unique filename for each uploaded file
  },
});

const upload = multer({ storage: storage });

module.exports.upload = upload;

module.exports.verifyToken = verifyToken;
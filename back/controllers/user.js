const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.signupUser = async (req, res, next) => {
    if (!req.body.email || !req.body.password) 
    {
      return res.status(400).send(new Error('Bad request!'));
    }

    //make sure user with same email does not already exist
    const existingUser = await User.find({email: req.body.email});
    if(existingUser)
    {
      return res.status(403).send(new Error('User with this email already exists!'));
    }

    //generate a salt
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
                  if (err) {
                    console.error('Error generating salt:', err);
                    return;
                  }
    //hash the password with the generated salt
      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) {
                      console.error('Error hashing password:', err);
                      return;
                    }
      });
    });                

    //create user account
    const user = new User({email:req.body.email, password:hashedPassword});
    if(!user)
    {
      console.error('Error creating new user.');
    }

    //return okay status message
    return res.status(200).json({message:'User created successfully.'});
  };

exports.loginUser = async (req, res, next) => {
    if (!req.body.email || !req.body.password) 
    {
      return res.status(400).send(new Error('Bad request!'));
    }

    const existingUser = await User.find({email: req.body.email});
    if(!existingUser)
    {
      return res.status(404).send(new Error('User not found!'));
    }

    //compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    //generate secret key for web token
    const generateSecretKey = () => {
      return crypto.randomBytes(32).toString('hex');
    };
    const secretKey = generateSecretKey();

    //generate token
    const token = jwt.sign({_id: existingUser._id}, secretKey, {expiresIn: '1h'});

    //return user ID and token
    return res.status(200).json({ _id: user._id, token });
  };
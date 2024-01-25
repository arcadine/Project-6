const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true, //ensures email addresses are unique in the database
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
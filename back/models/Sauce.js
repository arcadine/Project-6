const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define the Sauce schema
const sauceSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainPepper: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  heat: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    required: true,
  },
  usersLiked: [{
    type: String,
  }],
  usersDisliked: [{
    type: String,
  }],
});

//create the User model using the schema
const Sauce = mongoose.model('Sauce', sauceSchema);

module.exports = Sauce;
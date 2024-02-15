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
    required: true,
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
    type: Schema.Types.ObjectId,
    ref: 'User', //reference to the User model
  }],
  usersDisliked: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
});

//create the User model using the schema
const Sauce = mongoose.model('Sauce', sauceSchema);

module.exports = Sauce;
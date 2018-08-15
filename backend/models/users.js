const mongoose = require('mongoose');
// 3rd party package to validate fields which have unique flag
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true}
});

// with .plugin() any 3rd party library can be hooked to schema before saving to DB
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

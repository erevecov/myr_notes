const mongoose = require('mongoose');
let User

try {
  User = mongoose.model('Users');
} catch (error) {
  const UserSchema = new mongoose.Schema({  
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    slug: { type: String, required: true }
  }, {
    timestamps: true,
    versionKey: false
  });
  
  User = mongoose.model('Users', UserSchema); 
}

module.exports = User
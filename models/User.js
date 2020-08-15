const mongoose = require('mongoose');
let User

try {
  User = mongoose.model('Notes');
} catch (error) {
  const NoteSchema = new mongoose.Schema({  
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: String, required: true },
    slug: { type: String, required: true }
  }, {
    timestamps: true,
    versionKey: false
  });
  
  User = mongoose.model('Notes', NoteSchema); 
}

module.exports = User
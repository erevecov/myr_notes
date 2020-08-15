const mongoose = require('mongoose');

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

module.exports = mongoose.model('Notes', NoteSchema);
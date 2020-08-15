const mongoose = require('mongoose')
const Schema = mongoose.Schema
let Note

try {
  Note = mongoose.model('Notes')
} catch (error) {
  const NoteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userOwner: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    text: { type: String, required: true },
    date: { type: Date, required: true },
    private: { type: Boolean, required: true, default: true },
    archived: { type: Boolean, required: true, default: false },
    color: { type: String, required: true },
    icon: { type: String, required: true },
    board: { type: Schema.Types.ObjectId, ref: 'Boards', required: true }
  }, {
    timestamps: true,
    versionKey: false
  })
  
  Note = mongoose.model('Notes', NoteSchema) 
}

module.exports = Note
const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userOwner: { type: Schema.Types.ObjectId, ref: 'Users' },
  users: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  text: { type: String, required: true },
  date: { type: String, required: true },
  private: { type: Boolean, required: true, default: true },
  archived: { type: Boolean, required: true, default: false },
  color: { type: String, required: true },
  icon: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: 'Boards' }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Notes', NoteSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let Board

try {
  Board = mongoose.model('Boards')
} catch (error) {
  const BoardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userOwner: { type: Schema.Types.ObjectId, ref: 'Users' },
    users: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    date: { type: String, required: true },
    private: { type: Boolean, required: true, default: true },
    archived: { type: Boolean, required: true, default: false },
    slug: { type: String, required: true }
  }, {
    timestamps: true,
    versionKey: false
  })

  Board = mongoose.model('Boards', BoardSchema)
}

module.exports = Board
const connectToDatabase = require('../lib/database')
const Note = require('../models/Note')
const moment = require('moment')
const verifyToken = require('../lib/verifyToken')
const noteCreator = require('../utils/noteCreator')

const createNote = async (req, res) => {
  try {
    const credentials = req.headers.credentials
    const { name, users, text, private, color, icon, board } = req.body
    await connectToDatabase();
    
    let newNote = noteCreator({
      name,
      userOwner: credentials.iss,
      users,
      text,
      private,
      color,
      icon,
      board
    })
    
    let saveNote = await newNote.save()
    
    return res.status(200).json({ note: saveNote })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'could not create the resource', error: true })
  }
}

module.exports = verifyToken(createNote)


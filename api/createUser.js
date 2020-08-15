const connectToDatabase = require('../lib/database')
const User = require('../models/User')
//const moment = require('moment')
//const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const slugify = require('slugify')
const short = require('short-uuid')
const boardCreator = require('../utils/boardCreator')
const noteCreator = require('../utils/noteCreator')

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    await connectToDatabase();

    let findUserEmail = await User.find({ email: email })

    if (findUserEmail[0]) {
      return res.status(409).json({error: true, message: `the email ${email} is already registered`})
    }

    const hashed_password = await bcrypt.hash(password, 12);

    let newUser = new User({
      name: name,
      email: email,
      password: hashed_password,
      slug: `${short.generate()}-${slugify(name, { replacement: '-', lower: true, })}`
    })

    //console.log('NEWUSER', newUser)
    
    let newBoard = await boardCreator({
      name: 'my first board',
      userOwner: newUser._id
    })

    //console.log('NEWBOARD',newBoard)

    let newNote = await noteCreator({
      name: 'my first note',
      text: 'this is my first note!',
      board: newBoard._id,
      userOwner: newUser._id
    })

    //console.log('NEWNOTE', newNote)

    if (!newBoard.error && !newNote.error) {
      const [saveUser, saveBoard, saveNote] = [await newUser.save(), await newBoard.save(), await newNote.save()]

      return res.status(200).json({ user: saveUser, board: saveBoard, note: saveNote })
    }
  } catch (error) {
    console.log(error)  
    return res.status(500).json({ message: 'could not create the resource', error: true })
  }
}

module.exports = createUser


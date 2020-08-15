const connectToDatabase = require('../lib/database');
const Note = require('../models/Note')
const verifyToken = require('../lib/verifyToken')

const getNote = async (req, res) => {
  try {
    await connectToDatabase();
    let { _id } = req.headers.credentials.iss

    let notes = await Note.find({
      userOwner: _id
    });
     
    return res.status(200).json({ notes })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ status: 'ERROR. Could not get the resource.', error: true })
  }
}

module.exports = verifyToken(getNote)
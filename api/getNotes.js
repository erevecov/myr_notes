const connectToDatabase = require('../lib/database');
const Note = require('../models/Note')

const getNote = async (req, res) => {
  try {
    await connectToDatabase();

    let notes = await Note.find({});
     
    return res.status(200).json({ notes })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ status: 'ERROR. Could not get the resource.', error: true })
  }
}

module.exports = getNote
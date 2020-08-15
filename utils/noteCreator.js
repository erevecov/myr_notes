const Note = require('../models/Note')
const moment = require('moment')

module.exports = ({ 
  name,
  userOwner,
  users = [],
  text = '',
  private = true,
  archived = false,
  color = '#ffffff',
  icon = '',
  board
}) => {
  try {

    let newNote = new Note({
      name: name,
      userOwner,
      users,
      text,
      date: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSS'),
      private,
      archived,
      color,
      icon,
      board
    })
    
    return newNote
  } catch (error) {
    console.log(error)
    throw error
  }
}
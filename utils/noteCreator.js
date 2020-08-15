const Note = require('../models/Note')
const moment = require('moment')

module.exports = async ({ 
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

    //console.log('ANTES')

    let newNote = new Note({
      name: name,
      userOwner: userOwner,
      users: users,
      text: text,
      date: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSS'),
      private: private,
      archived: archived,
      color: color,
      icon: icon,
      board: board
    })

    //console.log('DESPUES', newNote)
    
    return newNote
  } catch (error) {
    console.log(error)
    throw error
  }
}
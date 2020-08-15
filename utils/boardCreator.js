const connectToDatabase = require('../lib/database')
const Board = require('../models/Board')
const moment = require('moment')
const slugify = require('slugify')

module.exports = async ({ name, userOwner, users = [], private = true }) => {
  try {
    await connectToDatabase()

    let findUserBoard = await Board.find({ 
      name: name,
      userOwner: userOwner
    })

    if (findUserBoard[0]){
      return {
        error: true,
        message: `board ${name} already exists in your account`
      }
    }

    let newBoard = new Board({
      name: name,
      userOwner: userOwner,
      users: users,
      date: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSS'),
      private: private,
      archived: false,
      slug: slugify(name, { replacement: '-', lower: true, })
    })
    
    return newBoard
  } catch (error) {
    console.log(error)
    throw error
  }
}
const connectToDatabase = require('../lib/database');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body
    await connectToDatabase()

    let findUser = await User.findOne({ email }).lean()

    if (findUser) {

      const valid = await bcrypt.compare(password, findUser.password)

      if (valid) {
        delete findUser.password

        let token = jwt.sign({
          iss: findUser
        }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 1000 })
        
        return res.status(200).json({ token })
      }
      
    }  

    return res.status(401).json({
      error: true,
      message: 'email or password incorrect'
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({ message: 'could not create the resource', error: true })
  }
  
}
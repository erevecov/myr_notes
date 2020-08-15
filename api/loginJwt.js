/*
const jwt = require('jsonwebtoken')


console.log(jwt.sign({
  name: 'eduardo reveco',
  username: 'ereveco',
  avatarUrl: 'https://avatars2.githubusercontent.com/u/24698838?s=60&v=4'
}, 'very-very-very-very-very-very-very-very-very-very-very-very-very-very-secret-token', { expiresIn: 60 * 60 })); // 1 hora



eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZWR1YXJkbyByZXZlY28iLCJ1c2VybmFtZSI6ImVyZXZlY28iLCJhdmF0YXJVcmwiOiJodHRwczovL2F2YXRhcnMyLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzI0Njk4ODM4P3M9NjAmdj00IiwiaWF0IjoxNTk3Mzk4MzAyLCJleHAiOjE1OTczOTgzNjJ9.6fCGf9QwEQWP5w9uZ_jRFrUADqnJ8i6o8KdPsGQAoW4
*/

module.exports = (req, res) => {
  return req.code(200).json({
    message: 'login'
  })
}
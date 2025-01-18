const jwt = require('jsonwebtoken')

const authToken = (request, response, next) => {

  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return response.status(401).json({ message: 'Token is missing' })

  jwt.verify(token, process.env.SECRET, (error, user) => {
    if (error) return response.status(403).json({ message: 'Invalid token' })

    request.user = user
    next()
  })
}

module.exports = authToken
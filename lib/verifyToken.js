const jwt = require('jsonwebtoken')

const secret_key = process.env.SECRET_KEY

const ERROR_MESSAGES = {
  NOT_AUTHORIZED: 'You are not authorized to access this resource.',
  TOKEN_EXPIRED: 'Your token has expired'
}

const verifyToken = (handler) => (req, res) => {
  const { 
    headers: { authorization },
    query: { token }
  } = req

  let errorResponse = {
    name: 'Not Authorized',
    message: ERROR_MESSAGES.NOT_AUTHORIZED
  }

  try {
    //console.log(authorization, token)
  
    if (token) {
      let verifyRes = verifyQueryToken(token)

      if (verifyRes && !verifyRes.error) {
        req.headers.authorized = true
        req.headers.credentials = verifyRes
        
        return handler(req, res)
      }

      if (verifyRes.error) {
        errorResponse.name = verifyRes.errorName
        errorResponse.message = verifyRes.errorMessage
      }
    }

    if (authorization) {
      let verifyRes = verifyAuthorizationToken(authorization)
      
      if (verifyRes && !verifyRes.error) {
        req.headers.authorized = true
        req.headers.credentials = verifyRes

        return handler(req, res)
      }

      if (verifyRes.error) {
        errorResponse.name = verifyRes.errorName
        errorResponse.message = verifyRes.errorMessage
      }
    }

    return accessError({res, errorName: errorResponse.name, errorMessage: errorResponse.message})
  } catch (error) {
    return accessError({res, errorName: errorResponse.name, errorMessage: errorResponse.message})
  }
}

const verifyQueryToken = token => {
  try {
    let decoded = jwt.verify(token, secret_key)  

    return decoded
  } catch (error) {
    return {
      error: true,
      errorName: error.name,
      errorMessage: error.message
    }
  }
}

const verifyAuthorizationToken = authBearer => {
  try {
    if (authBearer.includes('Bearer')) {
      let decoded = jwt.verify(authBearer.replace('Bearer ', ''), secret_key)  

      return decoded
    }

    return {
      error: true,
      errorName: 'NoBearerAuthorizationTokenError',
      errorMessage: ERROR_MESSAGES.NOT_AUTHORIZED
    }
  } catch (error) {
    return {
      error: true,
      errorName: error.name,
      errorMessage: error.message
    }
  }
}

const accessError = ({res, statusCode = 401, errorName = 'Not Authorized', errorMessage = ERROR_MESSAGES.NOT_AUTHORIZED}) => {
  return res.status(statusCode).json({
    status: statusCode,
    name: errorName,
    message: errorMessage
  })
}

module.exports = verifyToken 

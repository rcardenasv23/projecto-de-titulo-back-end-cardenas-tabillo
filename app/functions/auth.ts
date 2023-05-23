const jwt = require('jsonwebtoken')

export const authCreate = (data: {
  seller: boolean
  id_user: string
  email: string
  is_admin: boolean
}) => {
  return jwt.sign(data, process.env.SECRET_TOKEN)
}

export const authVerify = (req: any, res: any, next: any) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization === 'null' ||
    req.headers.authorization === 'undefined'
  )
    return res.status(401).json('Unauthorized')
  else if (req.headers.authorization !== '') {
    try {
      req.query.jwtData = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_TOKEN
      )
      next()
    } catch (e: any) {
      res.status(401).json('Error al verificar token')
    }
  } else {
    res.status(401).json('Empty Token.')
  }
}

export const authVerifySeller = (req: any, res: any, next: any) => {
  if (!req.headers.authorization) return res.status(401).json('Unauthorized')
  if (req.headers.authorization !== '') {
    try {
      let jwtData = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_TOKEN
      )
      if (!jwtData.seller) {
        res.status(401).json('El usuario no es vendedor')
      } else {
        req.query.jwtData = jwtData
        next()
      }
    } catch (e: any) {
      console.log(e)
      res.status(401).json('Error al verificar token')
    }
  } else {
    res.status(401).json('Empty Token.')
  }
}

export const authVerifyAdmin = (req: any, res: any, next: any) => {
  if (!req.headers.authorization) return res.status(401).json('Unauthorized')
  if (req.headers.authorization !== '') {
    try {
      let jwtData = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_TOKEN
      )
      if (!jwtData.is_admin) {
        res.status(401).json('El usuario no es admin')
      } else {
        req.query.jwtData = jwtData
        next()
      }
    } catch (e: any) {
      console.log(e)
      res.status(401).json('Error al verificar token')
    }
  } else {
    res.status(401).json('Empty Token.')
  }
}

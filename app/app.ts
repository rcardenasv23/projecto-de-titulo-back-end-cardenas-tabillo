import express from 'express'
import cors from 'cors'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`)
})

app.use('/user', require('./routes/users/app'))
app.use('/info', require('./routes/baseInfo/app'))
app.use('/seller', require('./routes/sellers/app'))
app.use('/publication', require('./routes/publications/app'))
app.use('/sale', require('./routes/sale/app'))

//Para rutas invalidas
app.use(async (req, res) => {
  res.status(200).send(`Route is no where to be found.`)
})

export default app

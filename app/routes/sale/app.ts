import express from 'express'
const router = express.Router()
import makeExpressCallback from '../../express-callback/app'
import route from './routes'

const routes = route(router, makeExpressCallback)

export = routes

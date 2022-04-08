import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/add-survey-controller-factory'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))

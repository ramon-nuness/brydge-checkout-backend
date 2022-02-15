import { Router } from 'express'
import { DbCheckoutRepository } from '../../infra/db'
import { AddCheckoutController } from '../../presentation/controllers/checkout-controller'
import { expressAdapt } from '../adapters/express-adapter'

const checkoutRoutes = Router()

const dbCheckoutRepository = new DbCheckoutRepository()
const addCheckoutController = new AddCheckoutController(dbCheckoutRepository)

checkoutRoutes
  .post('/checkout', expressAdapt(addCheckoutController))
  .get('/checkouts', async (request, response) => {
    return response.json(dbCheckoutRepository.findAll())
  })

export { checkoutRoutes }

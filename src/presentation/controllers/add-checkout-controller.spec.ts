import { DbCheckoutRepository } from '../../infra/db'
import { badRequest } from '../helpers/http-helpers'
import { HttpRequest } from '../protocols/http'
import { AddCheckoutController, AddCheckoutData } from './checkout-controller'

const makeFakeBody = () => ({
  productName: 'any_product_name',
  productPrice: 'any_product_price',
  quantityProduct: 'any_product_quantity',
  clientName: 'any_client_name',
  clientEmail: 'any_client_email',
  clientAddress: 'any_client_address',
  totalPurchase: 'any_client_address'
})

const makeFakeCheckoutModel = () => ({
  date: new Date(),
  productName: 'any_product_name',
  productPrice: 'any_product_price',
  dollarPrice: 5.18,
  quantityProduct: 'any_product_quantity',
  clientName: 'any_client_name',
  clientEmail: 'any_client_email',
  clientAddress: 'any_client_address',
  totalPurchase: 'any_client_address'
})

const makeDbCheckoutRepository = () => {
  class DbCheckoutRepositoryStub extends DbCheckoutRepository {
    async add(checkout: AddCheckoutData) {
      return makeFakeCheckoutModel()
    }
  }
  return new DbCheckoutRepositoryStub()
}

const makeSut = () => {
  const dbCheckoutRepositoryStub = makeDbCheckoutRepository()
  const sut = new AddCheckoutController(dbCheckoutRepositoryStub)

  return {
    sut,
    dbCheckoutRepositoryStub
  }
}

describe('AddCheckout Controller', () => {
  test('Deveria retornar 400 se falta o nome do produto', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        ...makeFakeBody(),
        productName: null
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error('Missing param: productName')))
  })
})

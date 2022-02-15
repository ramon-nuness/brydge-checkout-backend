import { DbCheckoutRepository } from '../../infra/db'
import { badRequest, created, noContent } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export type AddCheckoutData = {
  productName: string
  productPrice: string
  quantityProduct: string
  clientName: string
  clientEmail: string
  clientAddress: string
  totalPurchase: string
}

export class AddCheckoutController implements Controller {
  constructor(
    private readonly dbCheckoutRepository: DbCheckoutRepository
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredField = [
      'productName', 'productPrice', 'quantityProduct',
      'clientName', 'clientEmail', 'clientAddress',
      'totalPurchase'
    ]

    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new Error(`Missing param: ${field}`))
      }
    }

    const checkout = await this.dbCheckoutRepository.add(httpRequest.body)

    return created(checkout)
  }
}

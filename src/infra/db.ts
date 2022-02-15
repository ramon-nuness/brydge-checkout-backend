import axios from 'axios'
import { AddCheckoutData } from '../presentation/controllers/checkout-controller'

type CheckoutModel = {
  date: Date
  productName: string
  productPrice: string
  dollarPrice: number
  quantityProduct: string
  clientName: string
  clientEmail: string
  clientAddress: string
  totalPurchase: string
}

export class DbCheckoutRepository {
  private checkouts: Array<CheckoutModel> = []

  async add(checkout: AddCheckoutData): Promise<CheckoutModel> {
    const response = await axios.get('https://api.hgbrasil.com/finance')
    const dollar = await response.data.results.currencies.USD
    const dollarExchangeRate = dollar.buy
    const dollarPrice = Number(checkout.productPrice) * dollarExchangeRate
    const checkoutModel = {
      ...checkout,
      date: new Date(),
      dollarPrice
    }
    this.checkouts.push(checkoutModel)
    return checkoutModel
  }

  findAll() {
    return this.checkouts
  }
}

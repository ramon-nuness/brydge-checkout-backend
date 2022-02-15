import express, { json, NextFunction, Request, Response } from 'express'
import { checkoutRoutes } from './routes'

const middlewareCors = (request: Request, response: Response, next: NextFunction) => {
  response.set('Access-Control-Allow-Origin', '*')
  response.set('access-control-allow-methods', '*')
  response.set('access-control-allow-headers', '*')
  next()
}

const app = express()
app.use(json())
app.use(middlewareCors)
app.use(checkoutRoutes)

app.listen(7000, () => console.log(`Server is running on port 7000!`))

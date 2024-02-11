import { App } from './app'
import { ValidateEnv } from '@utils/validateEnv'
import { CustomerRoute } from '@routes/customers.route'
import { ProductRoute } from '@routes/products.route'
import { OrderRoute } from '@routes/orders.route'
import { AuthRoute } from '@routes/auth.route'

ValidateEnv()

const app = new App([new CustomerRoute(), new AuthRoute(), new ProductRoute(), new OrderRoute()])

app.listen()

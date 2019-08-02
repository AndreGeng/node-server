import Koa from "koa"
import bodyparser from "koa-bodyparser"
import logger from "koa-logger"
import json from "koa-json"
import * as dotenv from "dotenv"

import router from "./routes"

dotenv.config()

const app = new Koa()

// Middlewares
app.use(logger())
app.use(json())
app.use(bodyparser())

// Routes
app.use(router())

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`)
})

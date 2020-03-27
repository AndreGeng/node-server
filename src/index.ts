import Koa from "koa"
import bodyparser from "koa-bodyparser"
import logger from "koa-logger"
import json from "koa-json"
import dotenv from "dotenv"
import cors from "@koa/cors"

import router from "./routes"

dotenv.config()

const app = new Koa()

// Middlewares
app.use(logger())
app.use(cors())
app.use(json())
app.use(bodyparser())

// Routes
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`)
})

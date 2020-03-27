import Koa from "koa"
import bodyparser from "koa-bodyparser"
import logger from "koa-logger"
import json from "koa-json"
import dotenv from "dotenv"
import cors from "@koa/cors"
import { succ, info } from "common"

import router from "./routes"
/** node-server-eject mysql -- start */
import models from "./models"
/** node-server-eject mysql -- end */

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
/** node-server-eject mysql -- start */
// 初始化myql存储
models.init().then(() => {
  info("mysql数据表初始化完成!")
  /** node-server-eject mysql -- end */
  app.listen(port, () => {
    succ(`server started on http://localhost:${port}`)
  })
  /** node-server-eject mysql -- start */
})
/** node-server-eject mysql -- end */

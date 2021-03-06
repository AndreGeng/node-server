import path from "path"
import initAlias from "module-alias"
initAlias(path.resolve(__dirname, ".."))
import Koa from "koa"
import bodyparser from "koa-bodyparser"
import koaLogger from "koa-logger"
import json from "koa-json"
import dotenv from "dotenv"
import cors from "@koa/cors"
import gracefulShutdown from "http-graceful-shutdown"
import {
  logger,
  /** node-server-eject mysql -- start */
  db,
  /** node-server-eject mysql -- end */
  /** node-server-eject redis -- start */
  redis,
  /** node-server-eject redis -- end */
} from "common"
import requestId from "koa-requestid"

import router from "./routes"
import { errorHandler, resHandler } from "./middlewares"

const { NODE_ENV } = process.env

dotenv.config({
  path: path.resolve(__dirname, `../.env.${NODE_ENV}`),
})

const app = new Koa()

// Middlewares
app.use(errorHandler())
app.use(koaLogger())
app.use(requestId())
app.use(cors())
app.use(json())
app.use(bodyparser())
app.use(resHandler())

// Routes
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 3000

/** node-server-eject redis -- start */
redis.init()
/** node-server-eject redis -- end */

/** node-server-eject mysql -- start */
// 初始化myql存储
db.init().then(() => {
  logger.info("mysql数据表初始化完成!")
  /** node-server-eject mysql -- end */
  app.listen(port, () => {
    logger.succ(`server started on http://localhost:${port}`)
  })
  /** node-server-eject mysql -- start */
})
/** node-server-eject mysql -- end */

// gracefully shutdown
function cleanup() {
  // do clean up here
  return Promise.resolve()
}
gracefulShutdown(app, {
  development: NODE_ENV === "local",
  onShutdown: cleanup,
  finally: () => {
    logger.info("Server gracefulls shutted down...")
  },
})

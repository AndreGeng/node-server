import Router from "koa-router"
import combineRouters from "koa-combine-routers"

import healthRouter from "./health"

const router = new Router()
router.get("/", ctx => {
  ctx.body = "Hello World!!"
})

const combinedRouter = combineRouters(router, healthRouter)

export default combinedRouter

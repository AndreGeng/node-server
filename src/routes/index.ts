import Router from "koa-router"
import combineRouters from "koa-combine-routers"
import Koa from "koa"

import sessionRouter from "./session"
import { HTTP_CODE } from "../common"

const router = new Router()
router.get("/", (ctx, next) => {
  ctx.body = "Hello World!!"
})

const combinedRouter = combineRouters(router, sessionRouter)

export default combinedRouter

import Koa from "koa"
import Router from "koa-router"

import { STATUS_CODE } from "common"

const checkHealth = async (ctx: Koa.Context, next: Function) => {
  ctx.body = {
    code: STATUS_CODE.SUCC,
  }
  await next()
}

const router = new Router()

router.get("/", checkHealth)

export default router

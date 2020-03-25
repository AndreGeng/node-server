import Router from "koa-router"
import { STATUS_CODE } from "../common"

const router = new Router({ prefix: "/health" })

router.get("/", ctx => {
  ctx.body = {
    code: STATUS_CODE.SUCC,
  }
})

export default router

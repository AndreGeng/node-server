import Router from "koa-router"
import { registerCtrlsHelper } from "common"

const router = new Router()
router.get("/", ctx => {
  ctx.body = "Hello World!!"
})
registerCtrlsHelper(router)

export default router

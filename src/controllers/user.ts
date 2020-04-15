/** node-server-eject mysql */
import Koa from "koa"
import Router from "koa-router"
import { User } from "models"

import { STATUS_CODE, logger } from "common"

const createUser = async (ctx: Koa.Context, next: Function) => {
  const reqBody = ctx.request.body
  if (reqBody) {
    try {
      const user = await User.create(reqBody)
      ctx.succ({
        id: user.id,
      })
    } catch (err) {
      logger.error("createUser:", err)
      ctx.fail("创建用户失败")
    }
  }
  await next()
}

const queryUser = async (ctx: Koa.Context, next: Function) => {
  const { userId } = ctx.params
  try {
    if (userId) {
      const user = await User.findByPk(userId)
      if (!user) {
        throw new Error("用户不存在")
      }
      ctx.body = {
        code: STATUS_CODE.SUCC,
        data: user,
      }
      return
    }
  } catch (e) {
    logger.error("queryUser:", e)
    ctx.body = {
      code: STATUS_CODE.FAIL,
    }
  }
  await next()
}

const router = new Router()

router.post("/", createUser)
router.get("/:userId", queryUser)

export default router

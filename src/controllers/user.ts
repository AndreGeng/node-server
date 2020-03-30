/** node-server-eject mysql */
import Koa from "koa"
import Router from "koa-router"
import { db } from "common"

import { STATUS_CODE, error } from "common"

const createUser = async (ctx: Koa.Context, next: Function) => {
  const reqBody = ctx.request.body
  if (reqBody) {
    try {
      await db.User.create(reqBody)
      ctx.body = {
        code: STATUS_CODE.SUCC,
      }
    } catch (err) {
      error("createUser:", err)
      ctx.body = {
        code: STATUS_CODE.FAIL,
      }
    }
  }
  await next()
}

const queryUser = async (ctx: Koa.Context, next: Function) => {
  const { userId } = ctx.params
  try {
    if (userId) {
      const user = await db.User.findByPk(userId)
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
    error("queryUser:", e)
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

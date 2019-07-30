import Koa from "koa"

import { createSession } from "../services/session"
import { HTTP_CODE, STATUS_CODE } from "../common"

export const newSession = async (ctx: Koa.Context, next: Function) => {
  try {
    await createSession()
    ctx.status = HTTP_CODE.SUCC
    ctx.body = {
      code: STATUS_CODE.SUCC,
    }
  } catch (e) {
    ctx.status = HTTP_CODE.SUCC
    ctx.body = {
      code: STATUS_CODE.FAIL,
    }
  }
  await next()
}

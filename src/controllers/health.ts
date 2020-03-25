import Koa from "koa"

import { STATUS_CODE } from "../common"

export const checkHealth = async (ctx: Koa.Context, next: Function) => {
  ctx.body = {
    code: STATUS_CODE.SUCC,
  }
  await next()
}

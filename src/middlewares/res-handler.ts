import { Context } from "koa"

import { STATUS_CODE } from "common"

declare module "koa" {
  interface BaseContext {
    fail(msg?: string): void
    fail(code?: STATUS_CODE, msg?: string, data?: object): void
    succ(data?: object): void
  }
}

export default () => async (ctx: Context, next: Function) => {
  ctx.succ = (data = {}) => {
    ctx.body = {
      code: STATUS_CODE.SUCC,
      data,
    }
  }

  ctx.fail = (
    code: STATUS_CODE | string = "",
    msg: string = "",
    data: object = {}
  ) => {
    if (typeof code === "string") {
      msg = code
      code = STATUS_CODE.FAIL
    }
    ctx.body = {
      code,
      data,
      msg,
    }
  }
  await next()
}

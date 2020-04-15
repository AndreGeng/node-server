import { STATUS_CODE, HTTP_CODE } from "common"
import Koa from "koa"

export default () => async (ctx: Koa.Context, next: Function) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || HTTP_CODE.SERVER_ERROR
    ctx.body = {
      code: STATUS_CODE.FAIL,
      msg: err.message || "",
    }
  }
}

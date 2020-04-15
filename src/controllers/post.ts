/** node-server-eject redis */
import Koa from "koa"
import Router from "koa-router"
import { redis } from "common"

import { STATUS_CODE, logger } from "common"

const createPost = async (ctx: Koa.Context, next: Function) => {
  const reqBody = ctx.request.body
  if (reqBody && reqBody.id && reqBody.content) {
    try {
      await redis.client.setAsync(reqBody.id, reqBody.content)
      ctx.body = {
        code: STATUS_CODE.SUCC,
      }
      return
    } catch (err) {
      logger.error("createPost:", err)
    }
  }
  ctx.body = {
    code: STATUS_CODE.FAIL,
  }
}

const queryPost = async (ctx: Koa.Context, next: Function) => {
  const { postId } = ctx.params
  try {
    if (postId) {
      const postContent = await redis.client.getAsync(postId)
      if (!postContent) {
        throw new Error("post不存在")
      }
      ctx.body = {
        code: STATUS_CODE.SUCC,
        data: postContent,
      }
      return
    }
  } catch (e) {
    logger.error("queryPost:", e)
    ctx.body = {
      code: STATUS_CODE.FAIL,
    }
  }
  await next()
}

const router = new Router()

router.post("/", createPost)
router.get("/:postId", queryPost)

export default router

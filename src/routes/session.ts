import Router from "koa-router"
import combineRouters from "koa-combine-routers"

import { newSession } from "../controllers/session"

const router = new Router({ prefix: "/session" })

router.get("/new", newSession)

export default router

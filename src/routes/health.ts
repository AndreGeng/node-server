import Router from "koa-router"
import { checkHealth } from "../controllers"

const router = new Router({ prefix: "/health" })

router.get("/", checkHealth)

export default router

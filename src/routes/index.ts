import Router from "koa-router"
import combineRouters from "koa-combine-routers"
import Koa from "koa"

import sessionRouter from "./session"
import { HTTP_CODE } from "../common"

const router = new Router()

const combinedRouter = combineRouters(router, sessionRouter)

export default combinedRouter

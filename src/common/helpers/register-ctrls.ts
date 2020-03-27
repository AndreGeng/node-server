import path from "path"
import glob from "glob"
import Router from "koa-router"
import { debug } from "common"

const ctrlsPath = path.resolve("./src/controllers")
const prefix = "/"
const registerCtrlsHelper = (router: Router) => {
  glob
    .sync("**/*.ts", {
      cwd: ctrlsPath,
    })
    .map((file: string) => {
      debug(file)
      const ext = path.extname(file)
      const pathnameList = file
        .slice(0, file.length - ext.length)
        .split(path.delimiter)
      const ctrlRouter: Router = require(path.resolve(ctrlsPath, file)).default
      router.use(
        `${prefix}${pathnameList.join("/")}`,
        ctrlRouter.routes(),
        ctrlRouter.allowedMethods()
      )
    })
}

export default registerCtrlsHelper

import path from "path"
import glob from "glob"
import Router from "koa-router"

const prefix = "/"
const registerCtrlsHelper = (router: Router) => {
  glob
    .sync("**/*.ts", {
      cwd: path.resolve(__dirname, "../controllers"),
    })
    .map((file: string) => {
      const ext = path.extname(file)
      const pathnameList = file
        .slice(0, file.length - ext.length)
        .split(path.delimiter)
      const ctrlRouter: Router = require(`../controllers/${file}`).default
      router.use(
        `${prefix}${pathnameList.join("/")}`,
        ctrlRouter.routes(),
        ctrlRouter.allowedMethods()
      )
    })
}

export default registerCtrlsHelper

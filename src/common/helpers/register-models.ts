/** node-server-eject mysql */
import glob from "glob"
import path from "path"
import { Sequelize, Model } from "sequelize"
import { error } from "common"

/**
 * 加载models文件夹下除index.ts之外的其它model定义
 */
const registerModels = (sequelize: Sequelize) => {
  return glob
    .sync("./src/models/**/*.ts", {
      ignore: ["./src/models/index.ts"],
    })
    .reduce(
      (acc, file) => {
        const initModel = require(path.resolve(file)).default
        if (typeof initModel !== "function") {
          error("registerModels:", `${file}模块未找到初始化方法`)
        }
        const model = initModel(sequelize)
        acc[model.name] = model
        return acc
      },
      {} as { [key: string]: Model }
    )
}

export default registerModels

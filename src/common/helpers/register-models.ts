/** node-server-eject mysql */
import glob from "glob"
import path from "path"
import { Sequelize, Model } from "sequelize"

const modelsPath = path.resolve("./src/models")

/**
 * 加载models文件夹下除index.ts之外的其它model定义
 */
const registerModels = (sequelize: Sequelize) => {
  return glob
    .sync("**/*.ts", {
      cwd: modelsPath,
      ignore: ["index.ts"],
    })
    .reduce(
      (acc, file) => {
        const loadModel = require(path.resolve(modelsPath, file)).default
        const model = loadModel(sequelize)
        acc[model.name] = model
        return acc
      },
      {} as { [key: string]: typeof Model }
    )
}

export default registerModels

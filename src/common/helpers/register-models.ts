/** node-server-eject mysql */
import glob from "glob"
import path from "path"
import { Sequelize } from "sequelize"

const modelsPath = path.resolve("./src/models")

/**
 * 加载models文件夹下除index.ts之外的其它model定义
 */
const registerModels = (sequelize: Sequelize) => {
  glob
    .sync("**/*.ts", {
      cwd: modelsPath,
    })
    .forEach(file => {
      const loadModel = require(path.resolve(modelsPath, file)).default
      loadModel(sequelize)
    })
}

export default registerModels

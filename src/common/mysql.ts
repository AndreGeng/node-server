/** node-server-eject mysql */
import { Sequelize, Model } from "sequelize"
import registerModelsHelper from "./helpers/register-models"

interface DB {
  init(): Promise<Sequelize>
  sequelize?: Sequelize
}
interface SequelizeModel {
  [key: string]: (new () => Model<object, object>) & typeof Model
}

const db = {} as DB & SequelizeModel

db.init = () => {
  const { MYSQL_CONFIG } = process.env
  if (!MYSQL_CONFIG) {
    return Promise.reject("MYSQL_CONFIG环境变量不存在")
  }
  let cfg = JSON.parse(MYSQL_CONFIG)

  db.sequelize = new Sequelize(cfg.database, cfg.user, cfg.password, {
    host: cfg.host,
    dialect: "mysql",
    timezone: "+08:00",
  })
  const models = registerModelsHelper(db.sequelize)
  Object.assign(db, models)
  return db.sequelize.sync()
}

export default db

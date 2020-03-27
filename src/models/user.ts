/** node-server-eject mysql */
import { STRING, ENUM, Model, Sequelize } from "sequelize"

class User extends Model {
  public name!: string
  public gender!: string
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      name: {
        type: STRING,
        allowNull: false,
      },
      gender: {
        type: new ENUM("male", "female"),
        allowNull: false,
      },
    },
    {
      sequelize,
    }
  )
  return User
}

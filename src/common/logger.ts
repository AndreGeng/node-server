import Debug from "debug"
import chalk from "chalk"

const debug = Debug("{{projectName}}")
const succ = (...args: any[]) => console.log(chalk.green(...args))
const warn = (...args: any[]) => console.log(chalk.yellow(...args))
const error = (...args: any[]) => console.log(chalk.red(...args))
const info = (...args: any[]) => console.log(...args)

export { debug, succ, warn, error, info }

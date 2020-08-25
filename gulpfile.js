const { src, dest, series, parallel, symlink } = require("gulp")
const path = require("path")
const del = require("del")
const run = require("gulp-run")

let { NODE_ENV } = process.env
if (!NODE_ENV) {
  NODE_ENV = process.env.NODE_ENV = "prod"
}
const copyFiles = () => {
  return src(["**/*", "**/.*"], {
    ignore: ["**/*.ts", "node_modules/**"],
    base: __dirname,
  }).pipe(dest("./dist"))
}
const clean = () => {
  return del("./dist", { force: true })
}

const tsc = () => {
  return run(`tsc -p . --outDir ./dist`).exec()
}

const link = () => {
  return src("node_modules").pipe(symlink("./dist"))
}

const defaultTask = series(clean, parallel(tsc, copyFiles, link))

module.exports = {
  copyFiles,
  clean,
  tsc,
  link,
  default: defaultTask,
}

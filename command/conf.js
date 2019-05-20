const path = require('path')
const fs = require('fs')
const glob = require("glob")
const push = require("../util/push")

module.exports = function () {
  let confPath = path.resolve(process.cwd(), '.uploadrc.js')
  if (!fs.existsSync(confPath)) {
    return console.log('\x1b[91m', '[error]缺少配置文件.uploadrc.js 请先执行命令 nice-upload init [uploadUrl] 初始化配置文件')
  }
  const conf = require(confPath)
  if (!conf.uploadUrl){
    return console.log('\x1b[91m', '[error]缺少上传地址，请在 .uploadrc.js 配置文件内添加 uploadUrl')
  }
  if (conf.uploadList && !conf.uploadList.length) {
    return console.log('\x1b[91m', '[error]上传列表为空，请在 .uploadrc.js 配置文件内添加 uploadList')
  }
  conf.uploadList.forEach(item => {
    glob.sync(item.files).forEach(filePath => {
      push(filePath, item.prefix)
    })
  })

}
const push = require('../util/push')
const fs = require('fs')
const path = require('path')

module.exports = targPath => {
  let confPath = path.resolve(process.cwd(), '.uploadrc.js')
  if (!fs.existsSync(confPath)) {
    return console.log('\x1b[91m%s\x1B[91m', '[error] 缺少配置文件.uploadrc.js 请先执行命令 nice-upload init 初始化配置文件')
  }
  const conf = require(confPath)
  if (!conf.uploadUrl) {
    return console.log('\x1b[91m%s\x1B[91m', '[error] 缺少上传地址，请执行命令 `nice-upload url <uploadUrl>` 添加上传地址')
  }
  push(targPath)
}
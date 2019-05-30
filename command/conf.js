const path = require('path')
const fs = require('fs')
const glob = require("glob")
const push = require("../util/push")

module.exports = function () {
  let confPath = path.resolve(process.cwd(), '.uploadrc.js')
  if (!fs.existsSync(confPath)) {
    return console.log('\x1b[91m%s\x1B[91m', '[error] 缺少配置文件.uploadrc.js, 请先执行命令 `nice-upload init` 生成配置文件')
  }
  const conf = require(confPath)
  if (!conf.uploadUrl){
    return console.log('\x1b[91m%s\x1B[91m', '[配置文件有误] .uploadrc.js中 缺少上传地址参数 uploadUrl')
  }
  if (conf.uploadList && !conf.uploadList.length) {
    return console.log('\x1b[91m%s\x1B[91m', '[配置文件有误] .uploadrc.js中 上传规则列表为空，请修改 .uploadrc.js 中的上传规则 uploadList')
  }
  conf.uploadList.forEach(item => {
    glob.sync(item.files).forEach(filePath => {
      push(filePath, item.prefix)
    })
  })

}
const upload = require('../util/upload')
const onPush = require('./push')
const path = require('path')
const fs = require('fs')
const glob = require("glob")
const push = require("../util/push")


module.exports = function () {
  let confPath = path.resolve(process.cwd(), '.uploadrc.js')
  if (!fs.existsSync(confPath)) {
    // console.log('%c缺少配置文件.uploadrc.js请先执行 mc-upload init', 'color:red;');
    // console.log('\x1b[40m red \x1b[0m',232323)
    // console.log('\x1B[32m%s\x1B[32m', "=sgsgsg")
    return console.log('\x1b[91m', '[error]缺少配置文件.uploadrc.js 请先执行命令 nice-upload init 初始化配置文件')
  }
  const conf = require(confPath)
  
  conf.uploadList.forEach(item => {
    glob.sync(item.files).forEach(filePath => {
      console.log('globfilePath:', filePath)
      push(filePath, item.prefix)
    })
    // 
  })

}
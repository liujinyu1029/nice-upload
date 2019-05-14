const path = require('path')
const fs = require('fs')
const colors = require('colors/safe')

const oss = require('../mcoss')

module.exports = function (param, options) {
  let configfile = path.resolve(process.cwd(), '.uploadrc.js')
  if(options.config) {
    configfile = path.resolve(process.cwd(), options.config)
  }
  if(!fs.existsSync(configfile)) {
    return console.error(colors.red('没有找到配置文件，请先执行 mc-upload init'))
  }
  const config = require(configfile)
  if(options.development) {
    process.env.NODE_ENV = 'development'
  }
  const filepath = path.resolve(process.cwd(), param)
  const prefix = options.prefix || ''
  if(!fs.existsSync(filepath)) {
    return console.error(colors.red(filepath + '不存在'))
  }
  const ossServe = oss({
    env: process.env.NODE_ENV,
    ossTag: config[process.env.NODE_ENV].ossTag,
    ossKey: config[process.env.NODE_ENV].ossKey,
    appCode: config.appCode
  })
  ossServe
    .upload(path.join(prefix, path.basename(filepath)), filepath)
    .then(res => {
      if(res.error) {
        return Promise.reject(res.error)
      }
      console.log(colors.green(`upload success: ${res.data.furl}`))
    })
    .catch(err => {
      console.error(colors.red('上传失败'))
      console.error(err)
    })
}
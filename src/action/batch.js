const path = require('path')
const fs = require('fs')
const colors = require('colors/safe')
const glob = require('glob')

const uploader = require('../uploader')

module.exports = function (options) {
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
  if(!config.uplist || config.uplist.length === 0) {
    return console.error(colors.red('缺少上传内容'))
  }
  config.uplist.forEach(item => {
    let files = glob.sync(item.files).map(file => {
      return path.resolve(process.cwd(), file)
    })
    uploader(files, {
      ossTag: config[process.env.NODE_ENV].ossTag,
      ossKey: config[process.env.NODE_ENV].ossKey,
      appCode: config.appCode,
      prefix: item.prefix,
      env: process.env.NODE_ENV,
    })
    .catch(err => {
      console.log(err)
    })
  });
}
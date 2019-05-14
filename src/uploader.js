const path = require('path')
const fs = require('fs')
const colors = require('colors/safe')

const oss = require('./mcoss')

/**
 * 批量上传文件
 * @param {*} files 
 * @param {*} options
 *  ossTag,ossKey,prefix,env
 */
const uploader = (files, {
  ossTag = '',
  ossKey = '',
  appCode = '',
  prefix = '',
  env = 'production'
}) => {
  if(files instanceof String) {
    files = [files]
  }
  const ossServe = oss({
    env,
    ossTag: ossTag,
    ossKey: ossKey,
    appCode: appCode
  })
  let uploadQueue = []
  files.forEach(file => {
    if(fs.existsSync(file)) {
      let uploadInstance = ossServe
      .upload(path.join(prefix, path.basename(file)), file)
      .then(res => {
        if(res.error) {
          return Promise.reject(res.error)
        }
        console.log(colors.green(`upload success: ${res.data.furl}`))
        return res.data.furl
      })
      uploadQueue.push(uploadInstance)
    }else {
      console.error(colors.red('没有找到' + file))
    }
  })
  return Promise.all(uploadQueue)
}

module.exports = uploader
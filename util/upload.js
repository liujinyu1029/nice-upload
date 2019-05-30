const request = require('request')
const fs = require('fs')
const path = require('path')
const store = require('../story')
/** 
 * @param filePath 
 * let filePath = path.join(__dirname,'../js/a.js') 
 * 
 */
const upload = (filePath,opt={
  'file-path-head':undefined,
}) => {
  return new Promise((resolve, reject) => {
    let configPath = path.resolve(process.cwd(), '.uploadrc.js')
    let _uploadUrl = ''
    // 如果有.uploadrc.js 则全部按其配置走，
    // 如果无.uploadrc.js 则走 全局configStore 的配置
    if (fs.existsSync(configPath)){
      let config = require(configPath)
      if (!config.uploadUrl) {
        reject('.uploadrc.js 缺少必要字段 uploadUrl')
        return
      }else{
        _uploadUrl = config.uploadUrl
      }
    }else{
      _uploadUrl = store.getUploadUrl()
    }
    if (!_uploadUrl) {
      reject('上传失败 缺少必要的上传路径： uploadUrl')
      return
    }
    let options = {
      method: 'POST',
      url: _uploadUrl, //uri url 都支持
      headers: opt,
      formData: {
        file: fs.createReadStream(filePath)
      }
    }
    request(options, (error, response, data) => {
      if (!error) {
        if (response && response.statusCode == 200) {
          var res = null
          try{
            res = JSON.parse(data)
          } catch (e) {
            res = {
              ret: 0,
              error: '服务端响应成功，但是返回值为空'
            }
          }
          resolve(res)
        } else {
          resolve({
            ret:0,
            statusCode: response.statusCode,
            data,
          })
        }
      } else {
        // 失败
        reject({
          ret: 0, 
          error :'上传失败,请检查上传路径是否有效'
        })
      }
    })
  })
}

module.exports = upload




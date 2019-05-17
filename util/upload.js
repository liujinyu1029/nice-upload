const request = require('request')
const fs = require('fs')
const path = require('path')

/** 
 * @param filePath 
 * let filePath = path.join(__dirname,'../js/a.js') 
 */
const upload = (filePath,opt={
  'file-path-head':undefined,
}) => {
  return new Promise((resolve, reject) => {
    let configPath = path.resolve(process.cwd(), '.uploadrc.js')
    if (!fs.existsSync(configPath)){
      reject(new Error('未找到上传配置文件.uploadrc.js'))
      return
    }
    let config = require(configPath)
    if (!config.uploadUrl) {
      reject('.uploadrc.js 缺少必要字段 uploadUrl')
      return
    }
    let options = {
      method: 'POST',
      url: config.uploadUrl, //uri url 都支持
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
          error :'上传失败'
        })
      }
    })
  })
}

module.exports = upload




const request = require('request')
const fs = require('fs')
const config = require('../../config')

/** 
 * @param filePath 
 * const filePath = path.join(__dirname,'../js/a.js') 
 */
const upload = (filePath) => {
  let options = {
    method: 'POST',
    url: config.uploadUrl, //uri url 都支持
    formData: {
      file: fs.createReadStream(filePath)
    }
  }
  return new Promise((resolve, reject) => {
    request(options, (error, response, data) => {
      console.log('\x1B[32m%s\x1B[39m', "========================== response begin ==========================")
      console.log('[resData]:', data)
      if (!error) {
        if (response && response.statusCode == 200) {
          resolve(data || {
            errMsg: '远端服务器返回数据为空'
          })
        } else {
          resolve({
            statusCode: response.statusCode,
            data,
          })
        }
        console.log('[res.data]', data, response.statusCode)
      } else {
        // 失败
        reject({
          errMsg: '上传失败',
          error
        })
        console.log('[res.data]', '上传失败')
      }
      console.log('\x1B[32m%s\x1B[39m', "========================== response end ============================")
    })
  })
}


module.exports = upload




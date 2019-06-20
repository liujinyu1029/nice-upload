const push = require('../util/push')
const story = require('../story')

module.exports = targPath => {
  if (!targPath){
    return console.log('\x1b[91m%s\x1B[91m', '[error] 不要调皮，难不成你想上传空气？')
  }
  let storeUploadUrl = story.getUploadUrl()
  if (!storeUploadUrl) {
    return console.log('\x1b[91m%s\x1B[91m', '[error] 尚未配置上传地址，请执行命令 `nice-upload url <uploadUrl>` 添加上传地址')
  }
  push('push',targPath)
}
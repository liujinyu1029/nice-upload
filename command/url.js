const story = require('../story')

module.exports = function (uploadUrl) {
  let storeUploadUrl = story.getUploadUrl()
  // story.deleteUploadUrl()
  if (!uploadUrl){
    // 情况1：没传参 则展示操作
    if (storeUploadUrl){
      console.log('[已配][上传路径]', storeUploadUrl)
    }else{
      console.log('\x1b[91m%s\x1B[91m', '[warning] 尚未配置上传路径, 请执行 `nice-upload url [uploadUrl]` 进行添加')
    }
  } else {
    // 情况2：传参了 则进行设置操作
    story.setUploadUrl(uploadUrl)
    console.log('\x1B[32m%s\x1B[32m', '[change]', `上传地址修改为: ${uploadUrl}`)
  }
}
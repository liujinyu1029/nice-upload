const fs = require('fs')
const path = require('path')

module.exports = function (uploadUrl) {
  let confPath = path.resolve(process.cwd(), '.uploadrc.js')
  if (!fs.existsSync(confPath)) {
    return console.log('\x1b[91m%s\x1B[91m', '[error] 缺少配置文件.uploadrc.js, 请先执行命令 `nice-upload init [uploadUrl]` 初始化配置文件')
  }
  let rfs = fs.readFileSync(confPath, 'utf8')
  if (!uploadUrl) {
    let conf = require(confPath)
    if (!conf.uploadUrl){
      return console.log('\x1b[91m%s\x1B[91m', '[error]', '当前上传地址为空，请执行命令 `nice-upload url <uploadUrl>` 添加上传地址')
    }else{
      return console.log('\x1B[32m%s\x1B[32m', '[show]', `当前上传地址为: ${conf.uploadUrl}`)
    }
  }
  rfs = rfs.replace(/uploadUrl[\s\S]*uploadList/, `uploadUrl: '${uploadUrl}',\n  uploadList`)
  fs.writeFileSync(path.resolve(process.cwd(), '.uploadrc.js') ,rfs)
  console.log('\x1B[32m%s\x1B[32m', '[change]', `上传地址修改为: ${uploadUrl}`)
}
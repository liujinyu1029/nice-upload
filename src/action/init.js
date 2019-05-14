const fse = require('fs-extra')
const path = require('path')

module.exports = function () {
  const src = path.resolve(__dirname, '../../config/.uploadrc.js')
  const dest = path.resolve(process.cwd(), '.uploadrc.js')
  fse.copy(src, dest)
    .then(() => {
      console.log('初始化.uploadrc.js成功')
    })
    .catch((err) => {
      console.error(err)
    })
}
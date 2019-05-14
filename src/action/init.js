const fse = require('fs-extra')
const path = require('path')

module.exports = function () {
  const src = path.resolve(__dirname, '../../config/.mcuploadrc.js')
  const dest = path.resolve(process.cwd(), '.mcuploadrc.js')
  fse.copy(src, dest)
    .then(() => {
      console.log('初始化.mcuploadrc.js成功')
    })
    .catch((err) => {
      console.error(err)
    })
}
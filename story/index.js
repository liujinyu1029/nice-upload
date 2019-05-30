const Configstore = require('configstore')
const pk = require('../package.json')
const conf = new Configstore(pk.name)

module.exports = {
  conf,
  // 存储上传路径
  getUploadUrl: () => conf.get('UploadUrl'),
  setUploadUrl: url => conf.set('UploadUrl', url),
  deleteUploadUrl: () => conf.delete('UploadUrl'),
}

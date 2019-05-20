const fs = require('fs')
const path = require('path')

module.exports = function (uploadUrl) {
  const orgPath = path.resolve(__dirname, '../config/.uploadrc.js')
  let rfs = fs.readFileSync(orgPath,'utf8')
  if (uploadUrl) {
    rfs = rfs.replace("uploadUrl: ''", `uploadUrl: '${uploadUrl}'`)
  }
  fs.writeFileSync(path.resolve(process.cwd(), '.uploadrc.js') ,rfs)
}
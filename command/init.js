const fs = require('fs')
const path = require('path')

module.exports = function () {
    const orgPath = path.resolve(__dirname, '../config/.uploadrc.js')
    const targPath = path.resolve(process.cwd(), '.uploadrc.js')
    fs.createReadStream(orgPath).pipe(fs.createWriteStream(targPath))
}
const upload = require('./util/upload')
const path = require('path')

let filePath = path.join(__dirname, '../data/a.txt')
console.log(filePath)

upload(filePath)
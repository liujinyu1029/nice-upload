#!/usr/bin/env node
var program = require('commander');
const request = require('request-promise-native')

const initAction = require('./src/action/init')
// const fileAction = require('./../src/action/file')
// const batchAction = require('./../src/action/batch')

const pK = require('./package.json')

// process.env.NODE_ENV = 'production'

program
  .command('push <file>')
  .description('push file to static server')
  .action(onPush);

program
  .version(pK.version)
  .description('静态资源上传工具')

program
  .command('init')
  .description('初始化配置文件')
  .action(initAction);

// console.log(process.argv)

if (process.argv.length === 2) {
  program.command('push')
  // program.outputHelp();
}

program
  .parse(process.argv);

function onPush(file) {
  console.log(222, file)
  request({
    method: 'POST',
    uri: uploadUrl,
    formData,
    headers: {
      'Oss-auth': ossAuth,
      'Connection': 'alive',
      'App-Code': appCode
      // 'Accept-Encoding': 'gzip, deflate'
      // 'Content-Type': 'multipart/form-data'
    },
    json: true
  })
}
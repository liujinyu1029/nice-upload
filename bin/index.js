// #!/usr/bin/env node
// var program = require('commander');

// const initAction = require('../src/action/init')
// // const fileAction = require('./../src/action/file')
// // const batchAction = require('./../src/action/batch')

// const package = require('../package.json')

// // process.env.NODE_ENV = 'production'

// program
//   .command('<registry>')
//   .description('push file <registry>')
//   .action(onPush);

// program
//   .version(package.version)
//   .description('静态资源上传工具')

// program
//   .command('init')
//   .description('初始化配置文件')
//   .action(initAction);

// console.log(process.argv)

// if (process.argv.length === 2) {
//   program.command('push')
//   // program.outputHelp();
// }

// program
//   .parse(process.argv);

// function onPush() {
//   console.log(11,arguments)
// }
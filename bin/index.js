#!/usr/bin/env node

var program = require('commander');

const initAction = require('./../src/action/init')
const fileAction = require('./../src/action/file')
const batchAction = require('./../src/action/batch')

const package = require('./../package.json')

process.env.NODE_ENV = 'production'

program
  .version(package.version)
  .description('oss上传工具')

program
  .command('init')
  .description('初始化配置文件')
  .action(initAction);

program
  .command('batch')
  .description('批量上传')
  .option('-c, --config [value]', '自定义配置文件地址')
  .option('-d, --development', '切换到非正式环境oss')
  .action(batchAction)

program
  .command('file <path>')
  .description('上传单个文件到oss')
  .option('-c, --config [value]', '自定义配置文件地址')
  .option('-p, --prefix [value]', '上传到oss上的文件名前缀')
  .option('-d, --development', '切换到非正式环境oss')
  .action(fileAction)

program
  .parse(process.argv);

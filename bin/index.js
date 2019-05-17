#!/usr/bin/env node
var program = require('commander');
const pK = require('../package.json')
const onInit = require('../command/init')
const onPush = require('../command/push')
const onConf = require('../command/conf')

program
    .version(pK.version)
    .description('静态资源上传工具')

program
    .command('init')
    .description('初始化上传配置文件.uploadrc')
    .action(onInit);

program
    .command('conf')
    .description('[默认命令]按照配置文件.uploadrc上传')
    .action(onConf);

program
    .command('push <file/folder>')
    .description('上传单个文件or文件夹')
    .action(onPush);


if (process.argv.length === 2) {
    onConf()
}

program
    .parse(process.argv);

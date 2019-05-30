#!/usr/bin/env node
var program = require('commander');
const pK = require('../package.json')
const onInit = require('../command/init')
const onPush = require('../command/push')
const onConf = require('../command/conf')
const onUrl = require('../command/url')

program
    .version(pK.version)
    .description('静态资源上传工具')

program
    .command('[default]')
    .description('查看nice-upload基础信息')
    .action(onUrl);

program
    .command('url [uploadUrl]')
    .description('查看/修改 上传路径')
    .action(onUrl);

program
    .command('push [file/folder]')
    .description('上传 单个文件/文件夹')
    .action(onPush);

program
    .command('init')
    .description('初始化上传配置文件.uploadrc.js')
    .action(onInit);

program
    .command('conf')
    .description('按照配置文件.uploadrc.js规则 进行上传操作')
    .action(onConf);

if (process.argv.length === 2) {
    console.log(`${pK.name} @${pK.version}`)
    console.log(`${pK.description}`)
    console.log('-----------------------------------------------------')
    onUrl()
}

program
    .parse(process.argv);

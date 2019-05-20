const upload = require('./upload')
const fs = require('fs')
const glob = require("glob")

let pb = {
  targPathOrg: '',// 上传目标源
  prefix: '', // 替换文件夹前缀
  // 上传整个文件夹 递归
  handDirecUpload (direcFile) {
    glob.sync(direcFile + '/*').forEach(childFile => {
      // 判断是不是文件夹
      if (fs.lstatSync(childFile).isDirectory()) {
        this.handDirecUpload(childFile)
      } else {
        this.uploadFile(childFile)
      }
    })
  },
  // 上传单独文件
  uploadFile (filePath) {
    let { prefix, targPathOrg } = this || {}
    let prefixPath
    // 处理传给服务器的实际保存路径
    if (prefix) {
      if (filePath == targPathOrg) {
        // 上传的是单个文件，但是配置中写了prefix
        prefixPath = filePath.replace(/.*\//, /\/$/.test(prefix) && prefix || prefix + '/')
      } else {
        // 上传的是包含多个文件的文件夹
        if (/\/$/.test(targPathOrg)){
          prefixPath = filePath.replace(targPathOrg, /\/$/.test(prefix) && prefix || prefix+'/')
        } else if (/\/$/.test(prefix)) {
          prefixPath = filePath.replace(/\/$/.test(targPathOrg) && targPathOrg || targPathOrg + '/', prefix)
        }
      }
    }else{
      prefixPath = ''
    }
    
    // 上传
    upload(filePath, {
      'file-path': filePath,
      'file-prefix-path': prefixPath
    }).then(res => {
      if(res.ret){
        console.log('\x1B[32m%s\x1B[32m', '[success]', res.data)
      }else{
        return Promise.reject(res.error)
      }
    }).catch(err => {
      console.log('\x1b[91m%s\x1B[91m', '[error]', err)
    })
  }
}

function P(targPathOrg, prefix) {
  this.targPathOrg = targPathOrg
  this.prefix = prefix
}
P.prototype = pb
/**
 * targPath 必传
 * prefix 非必传 
 */ 
module.exports = (targPath, prefix='') => {
  let _p = new P(targPath, prefix)
  // 判断是‘文件夹’还是‘单独文件’
  var stat = fs.lstatSync(targPath)
  if (stat.isDirectory()) {
    // 上传文件夹
    _p.handDirecUpload(targPath)
  } else {
    // 上传单个文件
    _p.uploadFile(targPath)
  }
}
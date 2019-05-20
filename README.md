nice-upload -- 静态资源上传工具
===

`nice-upload` 上传spa打包后的dist文件到静态服务器.推荐全局安装.然后可以使用`nice-upload`命令

配套后台服务端程序 [nice-static-server](https://github.com/liujinyu1029/nice-static-server)



## Install

```
$ npm i -g nice-upload
```

## Example
```
$ nice-upload -h

静态资源上传工具

Options:
  -V, --version       output the version number
  -h, --help          output usage information

Commands:
  init [uploadUrl]    初始化上传配置文件.uploadrc
  conf                [默认命令]按照配置文件.uploadrc上传
  push <file/folder>  上传单个文件 or 文件夹

```

1、使用push命令直接上传(单个文件 或 整个文件夹)

```
$ nice-upload init http://nice.server.com/upload
    [init] 成功初始化配置文件.uploadrc.js

$ nice-upload push dist/static/img/404.a57b6f3.png
    [success] http://nice.server.com/resources/dist/static/img/404.a57b6f3.png

$ nice-upload push dist
    [success] http://nice.server.com/resources/dist/static/fonts/element-icons.6f0a763.ttf
    [success] http://nice.server.com/resources/dist/static/js/0.1745a4856fe5f21285eb.js
    [success] http://nice.server.com/resources/dist/static/css/app.0f9fe41a0c4ad7cb0260.css
    ...

```


2、通过配置文件上传
```
$ nice-upload init 
    [init] 成功初始化配置文件.uploadrc.js

$ vim .uploadrc.js 

    module.exports = {
      uploadUrl: 'http://nice.server.com/upload',
      uploadList: [{
        files: 'dist/static/', // 上传整个文件夹
        prefix: 'nice'  // 修改存储路径
      }]
    }

$ nice-upload   // [等效于 `nice-upload conf` 命令]
    [success] http://nice.server.com/resources/nice/fonts/element-icons.6f0a763.ttf
    [success] http://nice.server.com/resources/nice/js/0.1745a4856fe5f21285eb.js
    [success] http://nice.server.com/resources/nice/css/app.0f9fe41a0c4ad7cb0260.css
    ...

$ nice-upload url 
    [show] 当前上传地址为: http://nice.server.com/upload

$ nice-upload url http://nice.server.com/newUpload  // 修改上传路径
    [change] 上传地址修改为: http://nice.server.com/newUpload
```


3、通过配置文件实现多种上传方式

```
module.exports = {
  // 上传地址 [必须参数] 
  uploadUrl: 'http://localhost:9001/uploadResources',  

  // 上传文件列表
  uploadList: [{
    files: 'dist/js/a.js' // 上传独立文件
  },{
    files: 'dist/js/a.js', // 上传独立文件
    prefix: 'myjs/' // prefix非必传,传的话会替换在服务器端的保存路径
  },{
    files: 'dist/static', // 上传整个文件夹
    prefix: 'mystatic' 
  },{
    files: 'dist/js/*.map', // 支持glob规则，选择性只上传.map文件
    prefix: 'mydist/js'
  }]
}
```  

## TODO

* None

## LICENSE
MIT



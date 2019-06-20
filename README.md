nice-upload -- 静态资源上传工具
===

`nice-upload` 上传spa打包后的dist文件到静态服务器.推荐全局安装.然后可以使用`nice-upload`命令

配套后台服务端程序 [nice-static-server](https://github.com/liujinyu1029/nice-static-server)

> PS:两种上传模式：
1. 【直接上传】`push`命令 ：直接上传整个文件夹or某个文件，但要先通过`url`命令设置‘全局’上传路径；
2. 【通过配置文件上传】`conf`命令：依据配置文件".uploadrc.js"，实现更复杂的上传规则，配置文件可以用`init`命令初始化。（注：当`.uploadrc.js`中配置了上传路径属性`uploadUrl`时，会优先使用该路径，如果没有配置，则会用‘全局’上传路径，如果没有‘全局’路径，则要通过`url`配置）


## Install

```
$ npm i -g nice-upload
```

## help
```
$ nice-upload -h

静态资源上传工具

Options:
  -V,  --version        output the version number
  -h,  --help           output usage information

Commands:
  [default]             查看nice-upload基础信息与全局配置
  url    [uploadUrl]    查看[修改]上传路径
  push   [file/folder]  上传[单个文件/文件夹]
  init                  初始化上传配置文件.uploadrc.js
  conf                  按照配置文件.uploadrc.js规则 进行上传操作

```

## Usage

```js
$ nice-upload  // 默认命令 查看nice-upload基础信息
    nice-upload @0.2.1
    静态资源上传工具--配套的服务端代码 [nice-static-server](https://github.com/liujinyu1029/nice-static-server.git)
    -----------------------------------------------------
    [warning] 尚未配置上传路径, 请执行 `nice-upload url [uploadUrl]` 进行添加

$ nice-upload url http://118.24.107.17:9001/upload  // 修改全局配置 上传地址
    [change] 上传地址修改为: http://118.24.107.17:9001/upload

$ nice-upload url // 查看 全局配置 上传地址
    [已配][上传路径] http://118.24.107.173:9001/upload
```

## Example

1、使用push命令直接上传(单个文件 或 整个文件夹) **PS:push命令，走的是全局配置的上传地址**


```js
$ nice-upload push dist/static/img/404.a57b6f3.png
    [success] http://nice.server.com/resources/dist/static/img/404.a57b6f3.png

$ nice-upload push dist
    [success] http://nice.server.com/resources/dist/static/fonts/element-icons.6f0a763.ttf
    [success] http://nice.server.com/resources/dist/static/js/0.1745a4856fe5f21285eb.js
    [success] http://nice.server.com/resources/dist/static/css/app.0f9fe41a0c4ad7cb0260.css
    ...

```

2、使用conf命令通过配置文件上传 **conf命令只依赖于init出的.uploadrc.js配置文件，会忽略全局配置的上传路径** 

```js
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

$ nice-upload conf  // [等效于 `nice-upload conf` 命令]
    [success] http://nice.server.com/resources/nice/fonts/element-icons.6f0a763.ttf
    [success] http://nice.server.com/resources/nice/js/0.1745a4856fe5f21285eb.js
    [success] http://nice.server.com/resources/nice/css/app.0f9fe41a0c4ad7cb0260.css
    ...
```

3、通过配置文件实现多种上传方式

```js
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



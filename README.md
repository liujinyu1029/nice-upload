nice-upload -- 静态资源上传工具
===


[![NPM version][npm-image]][npm-url]


`nice-upload` spa伴侣 上传spa打包后的dist文件 推荐全局安装 然后可以使用`nice-upload`命令

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
    [success] 成功初始化配置文件.uploadrc.js

$ nice-upload push dist/static/img/404.a57b6f3.png
    [success] http://nice.server.com/resources/dist/static/img/404.a57b6f3.png
    ...

$ nice-upload push dist
    [success] http://nice.server.com/resources/dist/static/fonts/element-icons.6f0a763.ttf
    [success] http://nice.server.com/resources/dist/static/js/0.1745a4856fe5f21285eb.js
    [success] http://nice.server.com/resources/dist/static/css/app.0f9fe41a0c4ad7cb0260.css
    ...

```

2、通过配置文件上传
```
$ nice-upload init 
    [success] 成功初始化配置文件.uploadrc.js

$ vim .uploadrc.js 

    module.exports = {
      uploadUrl: 'http://nice.server.com/upload',
      uploadList: [{
        files: 'dist/static/', // 上传整个文件夹
        prefix: 'nice'  // 修改存储路径
      }]
    }

$ nice-upload // 等效于 `nice-upload conf` 命令
    [success] http://nice.server.com/resources/nice/fonts/element-icons.6f0a763.ttf
    [success] http://nice.server.com/resources/nice/js/0.1745a4856fe5f21285eb.js
    [success] http://nice.server.com/resources/nice/css/app.0f9fe41a0c4ad7cb0260.css
    ...

```

3、可以通过配置文件实现多种上传方式

```
module.exports = {
  /**
   * 上传地址 [必须条件]
   * 示例：'http://localhost:9001/uploadResources'
   */
  uploadUrl: '', 
  /**
   * 上传文件列表 
   * 示例：
   *  [{
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
   * 
   */
  uploadList: []
}
```  

## TODO

* None

## LICENSE
MIT



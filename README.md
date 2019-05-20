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

```
$ nice-upload init http://your.static.server.com/upload

    [success] 成功初始化配置文件.uploadrc.js

  nice-upload push dist
   
    [success] http://localhost:9001/resources/dist/static/fonts/element-icons.6f0a763.ttf
    [success] http://localhost:9001/resources/dist/static/js/0.1745a4856fe5f21285eb.js
    [success] http://localhost:9001/resources/dist/static/js/app.0f9fe41a0c4ad7cb0260.js
    ...

```


## TODO

* None

## LICENSE
MIT



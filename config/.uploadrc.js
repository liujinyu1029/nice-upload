module.exports = {
  /**
   * 上传地址
   * 示例：'http://localhost:9001/uploadResources'
   */
  uploadUrl: '',
  /**
   * 上传文件列表
   * 示例：
   *  [{
        files: 'dist/js/a.js'
      },{
        files: 'dist/js/a.js',
        prefix: 'myjs/' // prefix非必传,传的话会替换在服务器端的保存路径
      },{
        files: 'dist/', // 上传整个文件夹
        prefix: 'mydist' 
      },{
        files: 'dist/js/*.map', // 支持glob规则，选择性上传
        prefix: 'mydist/js'
      }]
   * 
   */
  uploadList: []
}
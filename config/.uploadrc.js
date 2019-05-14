// 配置文件参考OSS使用规则：https://wiki.sprucetec.com/pages/viewpage.action?pageId=18933140
module.exports = {
  /**
   * oss配置，非正式环境
   */
  development: {
    ossTag: '',
    ossKey: ''
  },
  /**
   * oss配置，正式环境
   */
  production: {
    ossTag: '',
    ossKey: ''
  },
  /**
   * app-code: 该字段用以统计配额，需要与devops中项目编码保持一致
   */
  appCode: '',
  /**
   * 上传的文件列表，files符合glob规则，prefix为上传到oss上的文件名前缀
   * 示例：{ files: 'dist/js/*',  prefix: 'js' }
   * 
   */
  uplist: []
}
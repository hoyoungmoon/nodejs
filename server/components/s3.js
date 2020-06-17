const AWS = require('./aws')
const config = require('../config/index')
const s3 = new AWS.S3()

module.exports.generatePreSignedUrl = (options) => {
  const {key, mimetype} = options
  const params = {
    Bucket: config.aws.s3.bucket,
    Key: key,
    ContentType: mimetype,
    // 읽을때 인증 없이 읽을 수 있다
    ACL: 'public-read',
    Expires: 60
  }
  try {
    console.log('config : ', config.aws)
    return s3.getSignedUrl('putObject', params)
  
  }
  catch (e) {
    throw e
  }
}
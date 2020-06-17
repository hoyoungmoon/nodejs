'use strict'

  const AWS = require('aws-sdk')
  const config = require('../config/index')

  AWS.config = {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: "ap-northeast-2",
    apiVersions: {
      s3: '2006-03-01'
    },
  }
  module.exports = AWS
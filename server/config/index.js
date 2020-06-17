module.exports = {
  database: {
      host:               'sampledbinstance.cuauvopr57v5.ap-northeast-2.rds.amazonaws.com',
      user:               "admin",
      password:           "admin1234",
      database:           "innodb",
      port:               "3306",
      connectionLimit:    "10",
      timezone:           "utc",
      debug:              ['ComQueryPacket', 'RowDataPacket']
  },
  aws: {
      accessKeyId: 'AKIASBQ7CBCW7SXMEEKF',
      secretAccessKey: '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',
      s3: {
        host: 'https://s3-ap-northeast-2.amazonaws.com',
        bucket: 's3-tutorial-2',
        frontPath: 'https://s3.ap-northeast-2.amazonaws.com/s3-tutorial-2',
        originUserImage: 'original',
        thumbnailUserImage: 'thumbnails'
      }
  }
}


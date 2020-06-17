const express = require('express')
const router = express.Router()
const controller = require('./imageUpload')


router.get('/fileUploadUrl', controller.fileUploadUrl)
router.get('/getExtension', controller.getExtension)

module.exports = router
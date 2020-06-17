const express = require('express')
const router = express.Router()
const controller = require('./feedLike-ctrl')
const JWT = require('../../../libs/jwt')

router.post('/:feedIdx/:idx',  controller.register)
router.delete('/:feedIdx/:idx', controller.delete)

module.exports = router
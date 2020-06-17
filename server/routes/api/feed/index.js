const express = require('express')
const router = express.Router()
const controller = require('./feed-ctrl')
const JWT = require('../../../libs/jwt')

router.post('/', controller.register)
router.get('/', controller.getList)
router.put('/:idx', controller.update)
router.delete('/:idx', controller.delete)

module.exports = router
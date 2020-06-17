const express = require('express')
const router = express.Router()
const controller = require('./feedReply-ctrl')
const JWT = require('../../../libs/jwt')

router.get('/', controller.getList)  // group 순서대로 group_order순서대로 정렬해서 getList
router.post('/:feedIdx', controller.registerComment) // 댓글 등록
router.post('/re/:feedIdx', controller.registerRecomment) //대댓글 등록
router.put('/:idx', controller.update)
router.delete('/:idx', controller.delete)

module.exports = router
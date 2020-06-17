const userRouter = require('./api/user')
const feedRouter = require('./api/feed')
const feedLikeRouter = require('./api/feedLike')
const feedReplyRouter = require('./api/feedReply')
const imageRouter = require('./api/common')
var express = require('express');
var router = express.Router();


router.use('/user', userRouter)
router.use('/feed', feedRouter)
router.use('/feedLike', feedLikeRouter)
router.use('/feedReply', feedReplyRouter)
router.use('/common', imageRouter)

module.exports = router;

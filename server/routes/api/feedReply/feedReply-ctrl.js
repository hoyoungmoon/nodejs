'use strict'

const db = require('../../../components/db')
const handler = require('./feedReply-handler')
const util = require('../../../components/util')

module.exports.getList = async (req, res, next) => {
    try {
        let options = req.query
        console.log('options:', options)
        const result = await handler.getList(options)
        res.status(200).json({result : result})
    } catch (err) {
        next(err)
    }
}

// FEED_IDX를 req.params.feedIdx로 받아오는 것이 맞나?
module.exports.registerComment = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let newFeedReply = req.body
        const maxGroup = await handler.getMaxGroup({ feedIdx: req.params.feedIdx })

        //newFeedReply.USER_IDX = req.decoded.sub
        newFeedReply.FEED_IDX = req.params.feedIdx
        newFeedReply.REGISTER_DATE = util.getCurrentTime()
        newFeedReply.GROUP_ORDER = 0
        newFeedReply.DEPTH = 0
        if (maxGroup[0].maxGroup !== null) {
            newFeedReply.GROUP = maxGroup[0].maxGroup + 1
        } else {
            newFeedReply.GROUP = 1
        }

        const result = await handler.insertComment(newFeedReply, connection)
        await db.commit(connection)
        res.status(200).json({registerFeedReply : result})
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}

// 대댓글(recomment)도 FEED_IDX, GROUP, GROUP_ORDER, DEPTH (프론트) 을 받아오고
// INSERT -> GROUP은 받아온 그대로 GROUP_ORDER, DEPTH는 부모의 +1 
// UDPATE -> 같은 GROUP의 REGISTER한 GROUP_ORDER보다 크거나 같은 것들 GROUP_ORDER + 1 (아마 UPDATE먼저 해야할듯)
module.exports.registerRecomment = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let newFeedReply = req.body
        newFeedReply.FEED_IDX = req.params.feedIdx
        newFeedReply.GROUP_ORDER += 1
        newFeedReply.DEPTH += 1 
        newFeedReply.REGISTER_DATE = util.getCurrentTime()

        const result = await handler.insertRecomment(newFeedReply, connection)
        await db.commit(connection)
        res.status(200).json({registerFeedReply : result})
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}

module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let updateFeedReply = req.body
        updateFeedReply.idx = req.params.idx
        updateFeedReply.UPDATE_DATE = util.getCurrentTime()

        const currentReply = await handler.getList({idx : updateFeedReply.idx})
        if(currentReply[0].USER_IDX !== updateFeedReply.USER_IDX) throw {status: 404, errorMessage: 'No edit authorization'}
        const result = await handler.update(updateFeedReply, connection)

        if(result === 0) throw { status: 404, errorMessage: 'Not found FeedReply' }
        await db.commit(connection)
        res.status(200).json({result: true})
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}

module.exports.delete = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        const currentReply = await handler.getList({idx : req.params.idx})
        if(currentReply[0].USER_IDX !== req.body.USER_IDX) throw {status: 404, errorMessage: 'No delete authorization'}

        const result = await handler.delete({idx : req.params.idx}, connection)
        await db.commit(connection)
        let returnValue = false
        if(result.affectedRows === 1){
            returnValue = true
        }
        res.status(200).json({result : returnValue})
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}
'use strict'

const db = require('../../../components/db')
const handler = require('./feedLike-handler')
const feedHandler = require('../feed/feed-handler')
const util = require('../../../components/util')


module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let newFeedLike = {}
        newFeedLike.FEED_IDX = req.params.feedIdx
        newFeedLike.USER_IDX = req.params.idx
        newFeedLike.REGISTER_DATE = util.getCurrentTime()

        const result = await handler.insert(newFeedLike, connection)

        if(result !== 0){
            await feedHandler.feedLikeUpdate({ idx: newFeedLike.FEED_IDX, isCanceled: false}, connection)
        }
        await db.commit(connection)
        res.status(200).json({ registerFeedLike: result })
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}


module.exports.delete = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let options = {}
        options.USER_IDX = req.params.idx
        options.feedIdx = req.params.feedIdx
        
        const result = await handler.delete(options, connection)
        if(result !== 0){
            await feedHandler.feedLikeUpdate({ idx: options.feedIdx, isCanceled: true }, connection)
        }
        await db.commit(connection)

        let returnValue = false
        if (result.affectedRows !== 0) {
            returnValue = true
        }
        res.status(200).json({ result: returnValue })
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}
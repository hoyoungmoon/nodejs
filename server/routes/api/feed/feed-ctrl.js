'use strict'

const db = require('../../../components/db')
const handler = require('./feed-handler')
const util = require('../../../components/util')
const crypto = require('../../../components/crypto')

module.exports.getList = async (req, res, next) => {
    try {
        let options = req.query
        
        const result = await handler.getList(options)
        res.status(200).json({result : result})
    } catch (err) {
        next(err)
    }
}

module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let newFeed = req.body
        newFeed.FEED_LIKE = 0
        newFeed.REGISTER_DATE = util.getCurrentTime()

        const result = await handler.insert(newFeed, connection)
        await db.commit(connection)
        res.status(200).json({registerFeed : result})
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}

module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let updateFeed = req.body
        updateFeed.idx = req.params.idx 
     
        updateFeed.UPDATE_DATE = util.getCurrentTime()
        const result = await handler.update(updateFeed, connection)

        if(result === 0) throw { status: 404, errorMessage: 'Not found Feed' }
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
'use strict'

const feedReplyModel = require('../../../models/feedReply')

module.exports.getList = async (options) => {
    try {
        return await feedReplyModel.getList(options)
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.getMaxGroup = async (options) => {
    try {
        return await feedReplyModel.getMaxGroup(options)
    } catch (err) {
        throw new Error(err)    
    }
}

module.exports.insertComment = async (options, connection) => {
    try {
        return await feedReplyModel.insertComment(options, connection)
    } catch (err) {
        throw new Error(err)      
    }
}

module.exports.insertRecomment = async (options, connection) => {
    try {
        return await feedReplyModel.insertRecomment(options, connection)
    } catch (err) {
        throw new Error(err)      
    }
}

module.exports.update = async (options, connection) => {
    try {
        return await feedReplyModel.update(options, connection)
    } catch (err) {
        throw new Error(err)    
    }
}

module.exports.delete = async (options, connection) => {
    try {
        return await feedReplyModel.delete(options.idx, connection)
    } catch (err) {
        throw new Error(err)    
    }
}
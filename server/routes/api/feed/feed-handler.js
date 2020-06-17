'use strict'

const feedModel = require('../../../models/feed')

module.exports.getList = async (options) => {
    try {
        return await feedModel.getList(options)
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        return await feedModel.insert(options, connection)
    } catch (err) {
        throw new Error(err)      
    }
}

module.exports.update = async (options, connection) => {
    try {
        return await feedModel.update(options, connection)
    } catch (err) {
        throw new Error(err)    
    }
}

module.exports.feedLikeUpdate = async (options, connection) => {
    try {
        return await feedModel.feedLikeUpdate(options, connection)
    } catch (err) {
        throw new Error(err)    
    }
}

module.exports.delete = async (options, connection) => {
    try {
        return await feedModel.delete(options.idx, connection)
    } catch (err) {
        throw new Error(err)    
    }
}
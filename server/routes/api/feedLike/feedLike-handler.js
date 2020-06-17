'use strict'

const feedLikeModel = require('../../../models/feedLike')

module.exports.getList = async (options) => {
    try {
        return await feedLikeModel.getList(options)
    } catch (err) { 
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        return await feedLikeModel.insert(options, connection)
    } catch (err) {
        throw new Error(err)      
    }
}

module.exports.delete = async (options, connection) => {
    try {
        return await feedLikeModel.delete(options, connection)
    } catch (err) {
        throw new Error(err)    
    }
}
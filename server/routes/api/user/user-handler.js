'use strict'

const userModel = require('../../../models/user')

module.exports.getList = async (options) => {
    try {
        return await userModel.getList(options)
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.findOneByEmail = async (options) => {
    try {
        return await userModel.findOneByEmail(options)
    } catch (err) {
        throw new Error(err)       
    }
}

module.exports.insert = async (options, connection) => {
    try {
        return await userModel.insert(options, connection)
    } catch (err) {
        throw new Error(err)      
    }
}

module.exports.update = async (options, connection) => {
    try {
        return await userModel.update(options, connection)
    } catch (err) {
        throw new Error(err)    
    }
}

module.exports.delete = async (options, connection) => {
    try {
        return await userModel.delete(options.idx, connection)
    } catch (err) {
        throw new Error(err)    
    }
}
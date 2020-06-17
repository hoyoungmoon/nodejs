'use strict'

const db = require('../../../components/db')
const handler = require('./user-handler')
const util = require('../../../components/util')
const crypto = require('../../../components/crypto')
const JWT = require('../../../libs/jwt')

module.exports.findOneByEmail = async (req, res, next) => {
    try {
        const duplicateUser = await handler.findOneByEmail(req.params.email)
        res.status(200).json({ duplicateUser: duplicateUser })
    } catch (err) {
        next(err)
    }
}


module.exports.getList = async (req, res, next) => {
    try {
        const result = await handler.getList({ idx: req.params.idx })
        res.status(200).json({ result: result })
    } catch (err) {
        next(err)
    }
}

module.exports.register = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let newUser = req.body

        const duplicateUser = await handler.findOneByEmail(newUser.EMAIL)
        if (duplicateUser) {
            throw { status: 409, errorMessage: 'Duplicate Email' }
        }

        const { salt, encodedPw } = crypto.createPasswordPbkdf2(newUser.PASSWORD)
        newUser.PASSWORD = encodedPw
        newUser.SALT = salt
        newUser.REGISTER_DATE = util.getCurrentTime()
        const results = await handler.insert(newUser, connection)

        await db.commit(connection)
        res.status(200).json({ registerUser: results })
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}


module.exports.login = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let loginUser = req.body
        let matchUser = await handler.findOneByEmail(loginUser.EMAIL)

        if (matchUser) {
            if (crypto.getPasswordPbkdf2(loginUser.PASSWORD, matchUser.SALT) === matchUser.PASSWORD) {

                const tokens = await JWT.createToken({ userData: {IDX:matchUser.IDX} })
                let options = {
                    idx: matchUser.IDX,
                    TOKEN: tokens.accessToken
                }
                let affectedRow = await handler.update(options, connection)
                if (affectedRow === 0) throw { status: 404, errorMessage: 'update failed' }
                await db.commit(connection)

                res.cookie("x_auth", tokens.accessToken, { maxAge: 9000000, httpOnly: true })
                res.status(200)
                    .json({ login: matchUser })

            } else {
                //throw { status: 409, errorMessage: 'Wrong password' }
                res.status(409).json({ login: 'Wrong password' })
            }
        } else {
            //throw { status: 409, errorMessage: 'Wrong email' }
            res.status(409).json({ login: 'Wrong email' })
        }


    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}

module.exports.logout = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        console.log("req.decoded.IDX",req.decoded.IDX)
        if (req.decoded) {
            let updateUser = {}
            updateUser.idx = req.decoded.IDX
            updateUser.TOKEN = ""

            const result = await handler.update(updateUser, connection)

            if (result === 0) throw { status: 404, errorMessage: 'Not found User' }
            await db.commit(connection)
            res.status(200).json({ logout: true })
        }
    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}


module.exports.auth = async (req, res, next) => {

    if (req.decoded) {
        res.status(200).json({
            isAuth: true,
            IDX: req.decoded.IDX,
            // EMAIL: req.decoded.EMAIL,
            // NAME: req.decoded.NAME,
            // INTRODUCE: req.decoded.INTRODUCE,
            // PATH: req.decoded.PATH,
            // TOEKN: req.decoded.TOKEN
        })
    } else {
        //throw { status: 404, errorMessage: 'auth fail' }
        res.json({ isAuth: false, error: 'fail auth' })
    }

}

module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {
        let updateUser = req.body
        updateUser.idx = req.body.IDX

        const { encodedPw, salt } = crypto.createPasswordPbkdf2(updateUser.PASSWORD)
        updateUser.PASSWORD = encodedPw
        updateUser.SALT = salt
        updateUser.UPDATE_DATE = util.getCurrentTime()
        const result = await handler.update(updateUser, connection)

        if (result === 0) throw { status: 404, errorMessage: 'Not found User' }
        await db.commit(connection)
        res.status(200).json({ result: true })

    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}


module.exports.delete = async (req, res, next) => {
    const connection = await db.beginTransaction()
    try {

        const idx = req.body.IDX
        const result = await handler.delete({ idx: idx }, connection)
        await db.commit(connection)
        let returnValue = false
        if (result.affectedRows === 1) {
            returnValue = true
        }
        res.status(200).json({ result: returnValue })

    } catch (err) {
        await db.rollback(connection)
        next(err)
    }
}

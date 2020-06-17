const express = require('express')
const router = express.Router()
const controller = require('./user-ctrl')
const JWT = require('../../../libs/jwt')
const auth = require('../../../middleware/auth')

//router.get('/:idx', controller.getList) 
router.get('/duplicate/:email', controller.findOneByEmail)
router.post('/', controller.register)
router.post('/login', controller.login)
router.post('/logout', auth.auth, controller.logout)
//router.put('/', JWT.decodeToken, controller.update)
//router.delete('/', JWT.decodeToken, controller.delete)
router.put('/', controller.update)
router.delete('/', controller.delete)
router.get('/auth', auth.auth, controller.auth)

module.exports = router
const userHandler = require('../routes/api/user/user-handler')
const JWT = require('../libs/jwt')

module.exports.auth = async (req, res, next) => {
    try {
        let token = req.cookies.x_auth
        console.log("req.headers.cookie", req.headers.cookie)
        console.log("req.cookies.x_auth", req.cookies.x_auth)
        let decoded = await JWT.decodeToken("Bearer " + token)
        
        let matchUser = await userHandler.getList({ idx: decoded.userData.IDX })

        console.log("matchUser[0].TOKEN", matchUser)
        if (token == matchUser[0].TOKEN) {
            console.log("token == matchUser[0].TOKEN", token == matchUser[0].TOKEN)
            req.decoded = decoded.userData
        }
        next();

    } catch (err) {
        res.json({ isAuth:false, error: err })
    }
}
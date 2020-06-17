const jwt = require('jsonwebtoken')
const fs = require('fs')

const privateKey = fs.readFileSync(`${__dirname}/private.pem`)
const publicKey = fs.readFileSync(`${__dirname}/public.pem`)


module.exports.createToken = async (data) => {
    try {
        const payload = {
            userData: data.userData
        }
        const accessToken = await generateToken(payload)
        return { accessToken }
    } catch (err) {
        throw err
    }
}

async function generateToken(payload, isRefresh) {
    try {
        return await jwt.sign(payload, privateKey,
            {
                algorithm: 'RS256',
                expiresIn: 60 * 60 * 24
            })
    } catch (err) {
        throw err
    }
}


module.exports.decodeToken = async (token) => {
    try {
        if (token && token.split(' ')[0] === 'Bearer') {
            return await jwt.verify(token.split(' ')[1], publicKey, { algorithms: 'RS256' })
        }
        else {
            throw 'AccessToken is empty'
        }
    } catch (err) {
        throw err
    }
}

// // client에서 header로 보낸 cookie에 담긴 토큰을 decode시킨다
// module.exports.decodeToken = async (req, res, next) => {
//     try {
//         var token = req.headers.authorization
//         if (token && token.split(' ')[0] === 'Bearer') {
//             await jwt.verify(token.split(' ')[1], publicKey, { algorithms: 'RS256' }, (err, decoded)=>{
//                 if(err) throw { status: 401, errorMessage: err }
//                 else{
//                     req.decoded = decoded
//                     next()
//                 }
//             })
//         }
//         else {
//             throw { status: 401, errorMessage: 'token is empty' }
//         }
//     } catch (err) {
//         next(err)
//     }
// }
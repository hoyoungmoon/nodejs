const s3 = require('../../../components/s3')
const util = require('../../../components/util')
var mime = require('mime-types')


module.exports.fileUploadUrl = async function (req, res, next) {
    try {
        let path
        let updateFile = req.body
        console.log('fileUploadUrl')
        
        const { mimetype, extension } = req.query
        path = `teamProject/${util.getCurrentTime()}/profile.${extension}`
        // 수정할 PATH 있으면 바디에 받아오기
        if(updateFile.PATH){
            path = updateFile.PATH
        }
        
        const url = s3.generatePreSignedUrl({
            key: path,
            mimetype: mimetype
        })
        console.log('url: ', url)
        // path = type === 'chat' ? `${config.aws.s3.frontPath}/${path}` : path
        res.status(200).json({ url, path })

    } catch (err) {
        next(err)
    }

}

module.exports.getExtension = async function (req, res, next) {
    console.log('getExtension')
    const { type } = req.query
    let extension = mime.extension(type)
    if (type == 'hwp') {
        extension = 'hwp';
    }
    // console.log('extension : ',extension)
    res.status(200).json({ extension: extension });
}

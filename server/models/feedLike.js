const db = require('../components/db')

// 피드에 좋아요 받은 갯수 나타내기
module.exports.getList = async (options) => {
    let sql = 'SELECT COUNT(*) AS `like` FROM FEED_LIKE'
    let values
    if(options.feedIdx){
        sql += ' WHERE FEED_IDX = ?'
        values = [options.feedIdx] 
    }
    return await db.query({
        sql: sql,
        values : values
    })
}

module.exports.insert = async (options, connection) => {
    const { insertId } = await db.query({
        connection: connection,
        sql: 'INSERT INTO FEED_LIKE SET ?',
        values: [options]
    })
    return insertId
}

module.exports.delete = async (options, connection) => {
    return await db.query({
        connection: connection,
        sql: 'DELETE FROM FEED_LIKE WHERE USER_IDX = ? AND FEED_IDX = ?',
        values: [options.USER_IDX, options.feedIdx]
    })
}
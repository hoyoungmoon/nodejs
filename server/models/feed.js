const db = require('../components/db')

module.exports.getList = async (options) => {
    let sql = 'SELECT * FROM FEED'
    let values
    if(options.idx){
        sql += ' WHERE IDX = ?'
        values = [options.idx]
    }
    if(options.userIdx){
        sql += ' WHERE USER_IDX = ?'
        values = [options.userIdx]
    }
    return await db.query({
        sql: sql,
        values: values
    })
}

module.exports.insert = async (options, connection) => {
    const { insertId } = await db.query({
        connection: connection,
        sql: 'INSERT INTO FEED SET ?',
        values: [options]
    })
    return insertId
}

module.exports.update = async (options, connection) => {

    let sql = 'UPDATE FEED SET ? WHERE IDX = ?'
    let values = [options, options.idx]
    
    const { affectedRows } = await db.query({
        connection: connection,
        sql: sql,
        values: values
    })
    return affectedRows
}

module.exports.feedLikeUpdate = async (options, connection) => {

    let sql = 'UPDATE FEED SET FEED_LIKE = FEED_LIKE + 1 WHERE IDX = ?'
    let values = [options.idx]
    if(options.isCanceled){
        sql = 'UPDATE FEED SET FEED_LIKE = FEED_LIKE - 1 WHERE IDX = ?'
    }
    
    const { affectedRows } = await db.query({
        connection: connection,
        sql: sql,
        values: values
    })
    return affectedRows
}

module.exports.delete = async (idx, connection) => {
    return await db.query({
        connection: connection,
        sql: 'DELETE FROM FEED WHERE IDX = ?',
        values: [idx]
    })
}
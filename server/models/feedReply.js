const db = require('../components/db')

// 댓글, 대댓글의 순서는 논의 후 수정
module.exports.getList = async (options) => {
    let sql
    let values
    if(options.idx){
        sql = 'SELECT * FROM FEED_REPLY WHERE IDX = ?'
        values = [options.idx]
    }
    if(options.feedIdx){
        sql = 'SELECT * FROM FEED_REPLY WHERE FEED_IDX = ? ORDER BY `GROUP`, `GROUP_ORDER` ASC'
        values = [options.feedIdx]
    }
    return await db.query({
        sql: sql,
        values: values
    })
}

module.exports.getMaxGroup = async (options) => {
    let sql = 'SELECT MAX(`GROUP`) AS `maxGroup` FROM FEED_REPLY WHERE `FEED_IDX` = ?'
    return await db.query({
        sql: sql,
        values: [options.feedIdx]
    })
}

module.exports.insertComment = async (options, connection) => {
    const { insertId } = await db.query({
        connection: connection,
        sql: 'INSERT INTO FEED_REPLY SET ?',
        values: [options]
    })
    return insertId
}

module.exports.insertRecomment = async (options, connection) => {
    const { affectedRows } = await db.query({
        connection: connection,
        sql: 'UPDATE FEED_REPLY SET `GROUP_ORDER` = `GROUP_ORDER` + 1 WHERE `GROUP` = ? AND `GROUP_ORDER` >= ? ',
        values: [options.GROUP, options.GROUP_ORDER]
    })
    const { insertId } = await db.query({
        connection: connection,
        sql: 'INSERT INTO FEED_REPLY SET ?',
        values: [options]
    })

    return { insertId, affectedRows }
}

module.exports.update = async (options, connection) => {
    let sql =  'UPDATE FEED_REPLY SET ? WHERE IDX = ?'
    let values = [options, options.idx]
    
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
        sql: 'DELETE FROM FEED_REPLY WHERE IDX = ?',
        values: [idx]
    })
}
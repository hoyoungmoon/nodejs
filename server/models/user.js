const db = require('../components/db')

module.exports.getList = async (options) => {
    let sql = 'SELECT * FROM USER'
    let values
    if(options.idx){
        sql += ' WHERE IDX  = ?'
        values = [options.idx]
    }

    return await db.query({
        sql: sql,
        values: values
    })
}

module.exports.findOneByEmail = async (email) => {
    let sql = 'SELECT * FROM USER WHERE EMAIL = ? limit 1'
    const result = await db.query({
        sql: sql,
        values: [email]
    })
    return result[0]
}

module.exports.insert = async (options, connection) => {
    const { insertId } = await db.query({
        connection: connection,
        sql: 'INSERT INTO USER SET ?',
        values: [options]
    })
    return insertId
}

module.exports.update = async (options, connection) => {
    const { affectedRows } = await db.query({
        connection: connection,
        sql: 'UPDATE USER SET ? WHERE IDX = ?',
        values: [options, options.idx]
    })
    return affectedRows
}

module.exports.delete = async (idx, connection) => {
    return await db.query({
        connection: connection,
        sql: 'DELETE FROM USER WHERE IDX = ?',
        values: [idx]
    })
}
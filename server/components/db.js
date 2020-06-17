'use strict'

var config = require('../config');
var mysql = require('mysql');

var pool = mysql.createPool({
    host:               config.database.host,
    user:               config.database.user,
    password:           config.database.password,
    database:           config.database.database,
    port:               config.database.port,
    connectionLimit:    config.database.connectionLimit,
    timezone:           config.database.timezone,
    debug:              config.database.debug
})

module.exports.query = options => {
    return new Promise((resolve, reject) => {
        let connection = options.connection ? options.connection : pool;
        connection.query(options.sql, options.values, function (err, results, fields) {
            if (err) reject(err);
            resolve(results);
        })
    })  
}

module.exports.beginTransaction = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) reject(err);
            else {
                connection.beginTransaction(function (err) {
                    if (err) reject(this.rollback(connection));
                    else { resolve(connection) };
                })
            }
        })
    })
}

module.exports.commit = connection => {
    return new Promise((resolve, reject) => {
        connection.commit(function (err) {
            if (err) reject(this.rollback(connection));
            else {
                connection.release();
                resolve();
            }
        })
    })
}

module.exports.rollback = connection => {
    return new Promise((resolve, reject) => {
        connection.rollback(function (err) {
            if (err) reject(err);
            else {
                connection.release();
                resolve();
            }
        })
    })
}
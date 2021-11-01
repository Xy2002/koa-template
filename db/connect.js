const mysql = require('mysql')

let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'host',
    user: 'user',
    password: 'password',
    database: 'db',
    timezone: 'Asia/Shanghai'
})

let db = {}

/**
 *
 * @param sql sql语句
 * @param values 构造所需的值
 * 查询:
 * let sql =`SELECT * FROM User WHERE username = ? and password = ?`
 * let result = await db.query(sql,[username,password])
 * 插入:
 * let sql = `INSERT INTO User(username,password) VALUES (?,?)`
 * let result = await db.query(sql,[username,password])
 * 更新:
 * let sql = `UPDATE User SET password = ? WHERE username = ?`
 * let result = await db.query(sql,[password,username])
 * 删除:
 * let sql = `DELETE FROM User WHERE username = ?`
 * let result = await db.query(sql,[username])
 * @return {Promise<unknown>}
 */
db.query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(rows)
                    connection.release()
                })
            }
        })
    })
}
module.exports = db

const mysql = require('mysql')
const conf = require('../conf/conf')
const jwt = require('jsonwebtoken')

const user = {
	insert:'insert into user_info(account, password, mail) values(?,?,?);',
	update:'update user_info set account=?, password=?, mail=? where uid=?;',
	login: 'select uid from user_info where account=? && password=?;',
    query: 'select * from user_info where uid=?;'
}

const pool = mysql.createPool(conf.mysql)

function register({account, password, mail}, res){
    pool.getConnection((err, connection) => {
        connection.query(user.insert, [account, password, mail], (err, result) => {
            connection.release()
            if(result){
                const token = jwt.sign({uid: result.insertId}, conf.secret, {expiresIn: '1d'})
                const refreshToken = jwt.sign({uid: result.insertId}, conf.secret, {expiresIn: '14d'})
                res.json({
                    code: 200,
                    msg: '注册成功',
                    token,
                    refreshToken
                })
            }else{
                if(err.code === 'ER_DUP_ENTRY'){
                    res.status(409)
                    res.json({
                        code: 1,
                        msg: '用户名已占用'
                    })
                }else{
                    console.log('register', err)
                }
            }
        })
    })
}

function login({account, password}, res){
    pool.getConnection((err, connection) => {
        connection.query(user.login, [account, password], (err, result) => {
            connection.release()
            if(result){
                if(result.length === 0){
                    res.json({
                        code: 1,
                        msg: '用户名或密码错误'
                    })
                }
                else{
                    const token = jwt.sign({uid: result[0].uid}, conf.secret, {expiresIn: '1d'})
                    const refreshToken = jwt.sign({uid: result[0].uid}, conf.secret, {expiresIn: '14d'})
                    res.json({
                        code: 200,
                        msg: '登录成功',
                        token,
                        refreshToken
                    })
                }
            }else{
                console.log('login', err)
            }
        })
    })
}

function queryBasic({uid}, res){
    pool.getConnection((err, connection) => {
        connection.query(user.query, uid, (err, result) => {
            connection.release()
            if(result){
                res.json({
                    code: 200,
                    uid: result[0].uid,
                    uname: result[0].account,
                    coin: result[0].coin,
                    bCoin: result[0].b_coin,
                    level: result[0].level,
                    follower: result[0].follower,
                    following: result[0].following,
                    dynamicCount: result[0].dynamic_count
                })
            }else{
                console.log('queryBasic', err)
            }
        })
    })
}

module.exports = {
    register,
    login,
    queryBasic
}
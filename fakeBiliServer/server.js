const express = require('express')
const expressJwt = require('express-jwt')
const { tokenErrorHandler } = require('./middleware')
const conf = require('./conf/conf')
const loginRouter = require('./routes/user')

const app = express()

app.use(express.static(__dirname + '/dist'))

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(expressJwt.expressjwt({
    secret: conf.secret,
    algorithms: ['HS256']
}).unless({
    path: ['/login', '/register']
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(loginRouter)

app.get('*',(req,res) => {
    res.status(404)
    res.end('404 Not Found');
})


//错误中间件
app.use(tokenErrorHandler)

app.listen(8080,() => {
    console.log('服务器 启动!')
})
const express = require('express')
const user = require('../dao/user')

const router = express.Router()
router.post('/register',(req, res) => {
    user.register(req.body, res)
})
router.post('/login',(req,res) => {
    user.login(req.body, res)
})
router.post('/token', (req, res) => {
    const tokens = {
        token : jwt.sign(req.auth.uid, conf.secret, {expiresIn: '1d'})
    }
    //refreshtoken有效期小于3天就刷新
    if((req.auth.exp - req.auth.iat) / 60 / 60 / 24 < 3){
        tokens.refreshToken = jwt.sign(req.auth.uid, conf.secret, {expiresIn: '14d'})
    }
    res.status(200).json(tokens)
})
router.post('/query/basic', (req, res) => {
    user.queryBasic(req.auth, res)
})

module.exports = router
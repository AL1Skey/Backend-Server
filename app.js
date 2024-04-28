const express = require('express')
const user = require('./router/user')
const product = require('./router/product')
const app = express()
const cors = require('cors')
const UserAuth = require('./middleware/UserAuth')


// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// Tester
app.get('/test',UserAuth.JWTAuth,(req,res)=>{
    res.send({data:req.user})
})

// Main Router
app.use('/',user)
app.use('/',product)

module.exports = app
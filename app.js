const express = require('express')
const user = require('./router/user')
const product = require('./router/product')
const app = express()
const cors = require('cors')


// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// Tester
app.get('/test',(req,res)=>{
    res.send({data:"Hello World!"})
})

// Main Router
app.use('/',user)
app.use('/',product)

module.exports = app
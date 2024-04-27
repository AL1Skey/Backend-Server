if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const user = require('./router/user')
const app = express()

const port = process.env.PORT || 1000

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Tester
app.get('/test',(req,res)=>{
    res.send({data:"Hello World!"})
})

// Main Router
app.use('/',user)

app.listen(port,()=>{
    console.log('Server is running on port ',port)
})
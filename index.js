if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()

const port = process.env.PORT || 1000

app.get('/test',(req,res)=>{
    res.send({data:"Hello World!"})
})

app.listen(port,()=>{
    console.log('Server is running on port ',port)
})
const express = require('express')

const app = express()

const http = require('http').createServer(app)

const PORT = process.env.PORT || 3280

http.listen(PORT,()=>{
    console.log(`Listning on Port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')

})
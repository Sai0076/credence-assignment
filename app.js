const express =require('express')
const app=express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/route', {useNewUrlParser: true})
const db = mongoose.connection
db.on('error',(error)=> console.error.apply(error))
db.on('open',()=> console.log('connected to database'))

app.use(express.json())

const routes = require('./route')
app.use('/route',routes)

app.listen(3000, ()=> console.log('server started'))

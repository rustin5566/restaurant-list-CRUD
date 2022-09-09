// 載入外部套件
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// mongoose 連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})


// routig
app.get('/', (req, res) => {
  res.send('hello world')
})


app.listen(3000, () => {
  console.log('app is running on http://localhost:3000')
})
const express = require('express')
const bodyParser = require('body-parser')
var userRouter = require('./routes/user.route')
var db = require('./db')




const app = express()
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded




app.get('/', function (req, res) {
  res.render('index', {
    name: 'Huu Thang'
  })
})
 
app.use('/users', userRouter)




app.listen(3001, function(){
  console.log('Server running.... port 30001')
})
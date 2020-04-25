const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const app = express()
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// var users = [
//   {id:1, name: 'Huu Thang'},
//   {id:1, name: 'Cuu Trung'},

// ];

db.defaults({ users: [] })
  .write()

app.get('/', function (req, res) {
  res.render('index', {
    name: 'Huu Thang'
  })
})
 

app.get('/users', function (req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  });
})

app.get('/users/search', function (req, res) {
  var q = req.query.q;
  // console.log(req.query.q)
  resultSearch = db.get('users').value().filter(function(user){
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })

  res.render('users/index', {
    users: resultSearch
  })
})

app.get('/users/create', function (req, res) {
  res.render("users/create");
});

app.post("/users/create", function (req, res) {
  var name = req.body;
  db.get('users').push(name).write();
  res.redirect("/users")
})

app.listen(3001, function(){
  console.log('Server running.... port 30001')
})
require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var userRouter = require('./routes/user.route')
var authRouter = require('./routes/auth.route')
var authMiddleware = require('./middleware/auth.middleware');
var productRouter = require('./routes/product.route');
var cartRouter = require('./routes/cart.route');
var sessionMiddleware = require('./middleware/session.middleware');

const app = express();
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render('index', {
    name: 'Huu Thang'
  })
})
 
app.use('/users',authMiddleware.requireAuth, userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);

app.listen(3001, function(){
  console.log('Server running.... port 30001')
})
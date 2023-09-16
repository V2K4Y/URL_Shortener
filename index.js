const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')

const {connectMongo} = require('./connection.js');

const staticRouter = require('./routes/static')
const urlRouter = require('./routes/url');
const userRouter = require('./routes/user');
const { restrictToLoginUserOnly, checkAuth } = require('./middlewares/auth.js');

const app = express();
const PORT = 5001;
 
//connect MongoDB
connectMongo("mongodb://127.0.0.1:27017/urlShortner1").then(() => console.log("MongoDb connected!"))

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//Routes
// app.use('/', staticRouter);
app.use('/', checkAuth, staticRouter)
app.use('/user', userRouter)
app.use('/api/url', restrictToLoginUserOnly, urlRouter);



//Server started
app.listen(PORT, () => console.log(`Server started at: ${PORT}`))
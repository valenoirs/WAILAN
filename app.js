// Requiring module, packages, etc.
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('connect-flash');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('dotenv').config();
const port = process.env.LOCAL_PORT;

// Create session store in database
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Middleware
app.use((req, res, next) => {
    if(req.session.idUser){
        res.locals.idUser = req.session.idUser;
    }
    if(req.session.idPetugas){
        res.locals.idPetugas = req.session.idPetugas;
    }
    if(req.session.idAdmin){
        res.locals.idAdmin = req.session.idAdmin;
    }

    next();
});

app.use(flash());

// Templating Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(express.static('public'));

// Connect to database
mongoose.connect(process.env.DB_URI)
.then(() => console.log(`Connected to ${process.env.DB_URI}`))
.catch((error) => console.log(error));

// HTTP Routes
app.use('/', require('./routes/user'));
app.use('/admin', require('./routes/admin'));
app.use('/petugas', require('./routes/petugas'));
app.use('/ticket', require('./routes/ticket'));
app.use('/chatroom', require('./routes/chatroom'));

// Ping Server!
app.get('/ping', (req, res, next) => {
    res.send('<h4>Putang ina mo bobo talaga gago!<h4><h4>Sekarang server sementara berjalan!<h4><h4>Now the server is running!<h4>');
});

app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404</h1>');
});

io.on('connection', (socket) => {
    console.log('User Connected!')
    socket.on('disconnect', () => {
        console.log("User Disconnected!");
    })
    socket.on('chat', (messageInfo) => {
        console.log(messageInfo);
    })
})

// Start Server
app.listen(port, () => {console.log(`Server Runnning at port ${port}`)});
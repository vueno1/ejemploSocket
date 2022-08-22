const express = require("express")
const app = express()
const path = require("path")
const exphbs = require("express-handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(path.dirname(''), './public'))) //conecta index.js
app.set('views', path.join(path.dirname(''), './public/views')) //conecta views

app.engine('.hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars), 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

const {createServer} = require("http")
const {Server} = require("socket.io")

const httpServer = createServer(app)
const io = new Server(httpServer, {/* options */})

io.on("connection", (socket) =>{
    console.log("usuario conectado a socket");
})

app.get("/", (req,res) =>{
    res.render("index")
})

app.listen(8080, ()=>{
    console.log(`escucho puerto 8080`);
})
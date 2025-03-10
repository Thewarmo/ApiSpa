var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/config/swaggerConfig');
const connectDB = require("./src/config/db");
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/auth');


var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const pacienteRoutes = require("./routes/paciente");
const citaRoutes = require("./routes/cita");
const procedimientoRoutes = require("./routes/procedimiento");


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use("/api/users", require("./routes/user.routes"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
// Security middleware
app.use(helmet()); // Adds various HTTP headers
app.use(cors({
  origin: ['http://localhost:4500', 'https://apispa.onrender.com'], // Añade tu dominio de Render
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/auth', authRoutes);
// Añade esto antes de module.exports = app;
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});



const dotenv = require('dotenv');
dotenv.config();
connectDB();



app.use('/', indexRouter);
app.use("/pacientes", pacienteRoutes);
app.use("/citas", citaRoutes);
app.use("/procedimientos", procedimientoRoutes);



module.exports = app;

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
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/auth', authRoutes);



const dotenv = require('dotenv');
dotenv.config();
connectDB();



app.use('/', indexRouter);
app.use("/pacientes", pacienteRoutes);
app.use("/citas", citaRoutes);
app.use("/procedimientos", procedimientoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;

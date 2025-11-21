require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const { errorHandler } = require('./middleware/errorhandler');
const swaggerDocument = require('./swagger-output.json');
const session = require('express-session');
const authRoutes = require("./routes/authRoutes");
const ensureAuth = require("./middleware/ensureAuth");
const passport = require("passport");
const patientRoutes = require("./routes/patientRoutes");

require("./auth/github");


app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    next();
})

app.use("/auth", authRoutes);

app.use("/", patientRoutes);

app.use('/', routes);

app.use(errorHandler);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
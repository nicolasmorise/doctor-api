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
const cors = require("cors");

require("./auth/github");

app.use(cors({
  origin: "https://doctor-api-w54x.onrender.com",
  credentials: true
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,       // important for localhost
      sameSite: "none"      // works with http local frontend
    }
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

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
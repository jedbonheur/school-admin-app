// import the needed node_modules.
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const AuthRoutes = require('./routes/auth-routes');
const MainRoutes = require('./routes/main-routes');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');

//constants
const PORT = 4000;
const mongoURI = process.env.MONGO_URI

//middlewares
// app.use(fileUpload());
app.use(cors());
// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny"))

// Any requests for static files will go into the public folder
app.use(express.static("public"))

// use parse body
app.use(express.json())

// use routes
app.use(AuthRoutes)
app.use(MainRoutes)

  // Node spins up our server and sets it to listen on port 8000.

  // connect initially while catching errors
    // connect initially while catching errors
try {
    mongoose.connect(mongoURI).then(()=> {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  })
} catch (error) {
    console.log('fail to connect', error)
}
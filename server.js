// import the needed node_modules.
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const AuthRoutes = require('./routes/auth-routes');
const MainRoutes = require('./routes/main-routes');
const app = express();
const cors = require('cors');
const path = require('path');

//constants
const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT

//middlewares
// app.use(fileUpload());
app.use(cors());
// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny"))


// use parse body
app.use(express.json())

app.use(express.static(path.join(__dirname, "/frontend/build/")));

// use routes
app.use(AuthRoutes)
app.use(MainRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});

  // Node spins up our server and sets it to listen on port 8000.

  // connect initially while catching errors
    // connect initially while catching errors
try {
    mongoose.connect(mongoURI).then(()=> {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Listening on port ${PORT}`)
    })
  })
} catch (error) {
    console.log('fail to connect', error)
}
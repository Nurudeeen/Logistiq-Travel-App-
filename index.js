const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require("./models/db")
const cors = require("cors");
app.use(cors());

db.connect();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 5000
require ("dotenv").config();

app.use("/magic", require("./routes/LogistiqRoute"))
app.use('/', require('./routes/UserRoute'));






app.listen(port, () => {
  console.log(`Magic at port ${port}`)
})
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require("./models/db")


db.connect();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000
require ("dotenv").config();

app.use("/magic", require("./routes/LogistiqRoute"))







app.listen(port, () => {
  console.log(`Magic at port ${port}`)
})
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require ("dotenv").config();

app.use("/magic", require("./routes/LogistiqRoute"))







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
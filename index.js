const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/v1', routes)
app.get('/', (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "server running successfully"
    })
})


app.listen(port, () => {
    console.log("Server running on port" + port)
})
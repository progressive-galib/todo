const express = require('express')
const api = require('./api')
const app = express();
const PORT = 3001;

app.get("/",(req, res)=>{
    res.json({
        m:"welcome"
    })
})

app.use("/api",api)

app.listen(PORT, () => {console.log(`listening to localhost:${PORT}`)});
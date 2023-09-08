const express = require('express')
const app =express();
PORT = 8080

app.listen(PORT,()=>{
    console.log(`Server running at PORT ${PORT}`)
});
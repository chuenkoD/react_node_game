const express = require('express');
const { ServerRoutes } = require('./routes/ServerRoutes');
const app = express();
const port = process.env || 3000;

async function start(){
    app.listen(port, async () => {
        console.log(`Server is listening on port ${port}`);
    })

    await ServerRoutes(app);
}

start();
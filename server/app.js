const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3001;
const ConnectString = "mongodb+srv://crustbrns:gAzAt0Hx6mVrxiDQ@cluster0.yml35q2.mongodb.net/?retryWrites=true&w=majority";

app.use(
    express.json({
        type: ["application/json", "text/plain"],
    })
);


async function start() {
    try {
        await mongoose.connect(ConnectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        app.listen(PORT, () => {
            console.log(`Server is working now on port ${PORT}`);
        });
    }
    catch (e) {
        console.log(e.message);
    }
}

start();
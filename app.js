require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT;
const userRouter = require('./users/user.router');

app.use(express.json());
app.use('/api/users', userRouter);

app.get("/", (req, res) =>{
    res.send('Hii this is home page')
    // res.json({
    //     success: true,
    //     message: "This is rest api"
    // })
});


app.listen(port, () =>{
    console.log(`My app is running on ports http://localshot:${port}`);
});
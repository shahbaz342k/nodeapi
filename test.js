const express = require('express');
const app = express();

const port = 4000;

app.get('/', (req, res) => {
    res.json({
        staus : true,
        msg: "this is working fine"
    });
});

app.listen(port, () => {
    console.log(`This app is running on port ${port}`);
    
})
const express = require('express');

const path = require('path');

const publicPath = path.join(__dirname, '../public');
// console.log(publicPath);
const port = process.env.Port || 3000;

var app = express();

app.use(express.static(publicPath));
app.listen(port, () => {
    console.log(`server is up on port ${port} Ctrl+C to quite.`);
});
app.get('/', (req, res) => {
    res.render('index.html');
});
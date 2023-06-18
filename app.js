const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')

const app = express();

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile('/signup.html', {root: __dirname})
});

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
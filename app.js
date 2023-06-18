const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile('/signup.html', {root: __dirname})
});

app.post('/', (req, res) => {

    let firstName = (req.body.inputFirst);
    let lastName = req.body.inputLast
    let email = req.body.email

    let data = {
        member: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    first_name: firstName,
                    last_name: lastName
                } 
            }
        ]
    }
    let jsonData = JSON.stringify(data)

    const url = "https://us10.api.mailchimp.com/3.0/lists/c3b3c1d819";

    const options = {
        method: "POST",
        auth: "anupreet26:20a56e41b3feb7183e80f902004b457c-us10"
    }

     const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.listen(3000, () => {
    console.log('Server running on port 3000')
})

// 20a56e41b3feb7183e80f902004b457c-us10
// c3b3c1d819 

//--data '{"name": "Freddie'\''s Favorite Hats", "contact": { "company" : "Mailchimp","ado 
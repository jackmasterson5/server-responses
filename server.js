const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log('app is listening on port: ', PORT);

app.get('*', (req, res) => {

    const sendData = (answer) => {
        res.send(answer);
    }

    const formatUrl = () => {
        let d = req.url.split('&d=')[0];
        let q = d.split('/?q=')[1];
        let data = util.analyzeQuestion(q, d, sendData);
    }

    formatUrl();
});

const util = {
    analyzeQuestion: (question, description, callback) => {
        let answer;
        if (question === 'Ping') {
            answer = 'OK';
        } else {
            answer = 'Response did not match a known input';
        }
        callback(answer);
    }
}

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
        } else if (question === 'Resume') {
            answer = 'https://docs.google.com/document/d/1SfoG7CdE0VYFax5zC1__NQF36ZAYEO78WDi9F6MBxiM/edit?usp=sharing';
        } else if (question === 'Degree') {
            answer = 'Front End Developer "Nanodegree" from Udacity: https://www.udacity.com/';
        } else if (question === 'Name') {
            answer = 'Jack Masterson';
        } else if (question = 'Source') {
            answer = 'Private GitHub: https://github.com/jackmasterson5/server-responses';
        } else if (question = 'Years') {
            answer = '2-3 years of experience';
        } else if (question = 'Status') {
            answer = 'Yes, I can prove my eligibility.';
        } else if (question === 'Referrer') {
            answer = 'I was contacted through Angel List by Jenny Gasparis.';
        } else if (question = 'Phone') {
            answer = '908-433-0178';
        } else if (question = 'Email+Address') {
            answer = 'jackmasterson5@gmail.com';
        } else if (question = 'Position') {
            answer = 'Front End/Ad Tech Software Engineer';
        } else {
            answer = 'Response did not match a known input';
        }
        callback(answer);
    }
}

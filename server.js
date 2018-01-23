const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log('app is listening on port: ', PORT);

app.get('*', (req, res) => {
    let analysis = Question.analysis();
    new Question(req.url, analysis, res);
});

class Question {
    static analysis() {
        return {
            'Ping': 'OK',
            'Resume': 'https://docs.google.com/document/d/1SfoG7CdE0VYFax5zC1__NQF36ZAYEO78WDi9F6MBxiM/edit?usp=sharing',
            'Degree': 'Front End Developer "Nanodegree" from Udacity: https://www.udacity.com/',
            'Name': 'Jack Masterson',
            'Source': 'Private GitHub: https://github.com/jackmasterson5/server-responses',
            'Years': '2-3 years of experience',
            'Status': 'Yes, I can prove my eligibility',
            'Referrer': 'I was contacted through Angel List by Jenny Gasparis',
            'Phone': '908-433-0178',
            'Email+Address': 'jackmasterson5@gmail.com',
            'Position': 'Front End/Ad Tech Software Engineer',
        }
    }

    constructor(url, analysis, res) {
        this.res = res;
        this.analysis = analysis;
        
        let d = url.split('&d=')[0];
        let q = d.split('/?q=')[1];

        this.question = q;

        this.analyze();
    }
    analyze() {
        
        let answer = this.analysis[this.question];
        this.sendData(this.res, answer);
    }
    sendData(res, answer) {
        res.send(answer);
    }
}

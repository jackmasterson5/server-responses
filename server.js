const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log('app is listening on port: ', PORT);

app.get('*', (req, res) => {
    let analysis = Question.analysis(req.url);
    new Question(req.url, analysis, res);
});

class Question {
    static analysis(url) {
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
            'Puzzle': this.solvePuzzle(url),
        }
    }

    static solvePuzzle(url) {
        let final = 'ABCD';
        let left;
        let stage = decodeURI(url.split('ABCD')[1]).split('\n');

        let use = {
            'A': stage[1],
            'B': stage[2],
            'C': stage[3],
            'D': stage[4],
        };

        if (use['A'] !== undefined) {
            use['A'].split('')[0] === '-' ? left = true : left = false;
            let keys = Object.keys(use);
            keys.map((a, b) => {
                let row = use[a].slice(1);
                row = row.replace('%3D', '=');
                row = row.split('');
                row[b] = '=';
                row = row.join('');
                row = this.replaceDashes(row, left);
                final += ('\n' + a + row);
            });

            return final;
        }

    }

    static replaceDashes(r, left) {
        let arrow;
        let opp;

        if (left === true) {
            arrow = '<';
            opp = '>';
        } else {
            arrow = '>';
            opp = '<';
        }
        let stage = [];
        r = r.split('');
        r.map((a,b) => {
            if (a === '-') {
                if (b % 2 === 0) {
                    a = opp;
                } else {
                    a = arrow;
                }
            }
            stage.push(a);
        });
        return stage.join('');
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

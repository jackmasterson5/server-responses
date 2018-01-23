const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log('app is listening on port: ', PORT);

// for any GET request, create a new instance of Question
app.get('*', (req, res) => {
    // analysis is a static var
    let analysis = Question.analysis(req.url);
    new Question(req.url, analysis, res);
});

class Question {
    // stock answers to the questions with a solvePuzzle method
    // to work out the separate logic of the unique puzzle
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
        // start the final string with the 'ABCD' that each leads with
        let final = 'ABCD';

        // a var for determining which way the arrow should start by pointing
        let left;

        // staging object to separate the ABCD strings into 
        // a more useful type
        let stage = decodeURI(url.split('ABCD')[1]).split('\n');

        // formatted for use
        let use = {
            'A': stage[1],
            'B': stage[2],
            'C': stage[3],
            'D': stage[4],
        };

        // if the first value of the first line is a dash, then 
        // the arrow points left to start
        use['A'].split('')[0] === '-' ? left = true : left = false;

        // further formattingn of the strings
        let keys = Object.keys(use);
        keys.map((a, b) => {
            // replace the errant %3D with an equals sign
            let row = use[a].slice(1);
            row = row.replace('%3D', '=');

            // the row number is the index of the equals sign for that row
            row = row.split('');
            row[b] = '=';
            row = row.join('');

            // replace the dashes with the proper string, including
            // which way they should start by pointing
            row = this.replaceDashes(row, left);

            // add to the final string with a new line to start each
            final += ('\n' + a + row);
        });

        return final;

    }

    static replaceDashes(r, left) {
        // arrow and opp(osite) determine which way to point the arrow
        let arrow;
        let opp;

        // staging array to hold the proper strings
        let stage = [];

        if (left === true) {
            arrow = '<';
            opp = '>';
        } else {
            arrow = '>';
            opp = '<';
        }

        r = r.split('');

        // the arrows flip back and forth if they are '-', based
        // on whether they are even/odd, and which way the first arrow
        // started pointing
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

    // sets the instance variables and starts analyzing the question
    constructor(url, analysis, res) {
        this.res = res;
        this.analysis = analysis;

        let d = url.split('&d=')[0];
        let q = d.split('/?q=')[1];

        this.question = q;

        this.analyze();
    }

    // the answer is the question key's value in the analysis object
    analyze() {
        let answer = this.analysis[this.question];
        
        this.sendData(this.res, answer);
    }

    // send the data using res.send
    sendData(res, answer) {
        res.send(answer);
    }
}

// Note:
// There are almost certainly better ways to do the things I've done
// above. I'd be interested in hearing honest feedback about how to 
// do this better so that I can continue learning! Thanks for your time!
// Jack Masterson

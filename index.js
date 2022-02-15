
const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

let urlYear = 2021;

const baseurl1 = 'https://www.davisuwcscholars.org/scholars/class-of-';
const baseurl2 = 'https://www.davisuwcscholars.org/scholars/';

// const combinedUrl = baseurl + (urlYear.toString());

totalcounter = 0;
oddcounter = 0;
evencounter = 0;

//BASE URL 1

for (let i = 2021; i >= 2018; i--) {

    axios(baseurl1 + (i.toString()))
    .then(resp => {
        const html = resp.data;
        // console.log(html)
        const students = [];
        

        const $ = cheerio.load(html);
        $('.odd', html).each(function(idx, el) {

            const student = { name: "", country: "", uwc: "", uni: "", class: i};

            student.name = $(el).children('.views-field-title').text().trim();
            student.country = $(el).children('.views-field-field-country').text().trim();
            student.uwc = $(el).children('.views-field-field-uwc-school').text().trim();
            student.uni = $(el).children('.views-field-field-school').text().trim();

            students.push(student);
            totalcounter += 1;
            oddcounter += 1;

        })
        $('.even', html).each(function(idx, el) {

            const student = { name: "", country: "", uwc: "", uni: ""};

            student.name = $(el).children('.views-field-title').text().trim();
            student.country = $(el).children('.views-field-field-country').text().trim();
            student.uwc = $(el).children('.views-field-field-uwc-school').text().trim();
            student.uni = $(el).children('.views-field-field-school').text().trim();

            students.push(student);
            totalcounter += 1;
            evencounter += 1;

        })
        console.log("year:" + i);
        console.log("total students:"+totalcounter);
        console.log("odd students:"+oddcounter);
        console.log("even students:"+evencounter);
        
    })
    .catch(err => console.log(err));
}

//BASE URL 2
for (let i = 2017; i >= 2004; i--) {

    axios(baseurl2 + (i.toString()))
    .then(resp => {
        const html = resp.data;
        // console.log(html)
        const students = [];
        

        const $ = cheerio.load(html);
        $('.odd', html).each(function(idx, el) {

            const student = { name: "", country: "", uwc: "", uni: "", class: i};

            student.name = $(el).children('.views-field-title').text().trim();
            student.country = $(el).children('.views-field-field-country').text().trim();
            student.uwc = $(el).children('.views-field-field-uwc-school').text().trim();
            student.uni = $(el).children('.views-field-field-school').text().trim();

            students.push(student);
            totalcounter += 1;
            oddcounter += 1;

        })
        $('.even', html).each(function(idx, el) {

            const student = { name: "", country: "", uwc: "", uni: ""};

            student.name = $(el).children('.views-field-title').text().trim();
            student.country = $(el).children('.views-field-field-country').text().trim();
            student.uwc = $(el).children('.views-field-field-uwc-school').text().trim();
            student.uni = $(el).children('.views-field-field-school').text().trim();

            students.push(student);
            totalcounter += 1;
            evencounter += 1;

        })
        console.log("year:" + i);
        console.log("total students:"+totalcounter);
        console.log("odd students:"+oddcounter);
        console.log("even students:"+evencounter);
        console.log(students);
        
    })
    .catch(err => console.log(err));
}



app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
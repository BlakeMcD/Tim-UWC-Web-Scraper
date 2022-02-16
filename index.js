

const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const exportUsersToExcel = require('./exportService');

const app = express();

const baseurl1 = 'https://www.davisuwcscholars.org/scholars/class-of-';
const baseurl2 = 'https://www.davisuwcscholars.org/scholars/';

// const combinedUrl = baseurl + (urlYear.toString());

let totalcounter = 0;
let oddcounter = 0;
let evencounter = 0;

let operationsCompleted = 0;

let students = [];

function complete() {
    operationsCompleted += 1;
    if (operationsCompleted >= 18) {
        console.log("students length:" + students.length)
        console.log("COMPLETELY COMPLETE!")

        const workSheetColumnName = [
            "Name", 
            "Country", 
            "UWC", 
            "UNI", 
            "Class"
        ]

        const workSheetName = 'Davis Scholar Recipients';
        const filePath = './outputFiles/excel-from-js.xlsx';

        exportUsersToExcel(students, workSheetColumnName, workSheetName, filePath);
    }
}

//BASE URL 1





for (let i = 2021; i >= 2018; i--) {

    axios(baseurl1 + (i.toString()))
    .then(resp => {
        const html = resp.data;
        // console.log(html)
        
        // const students = [];

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

            const student = { name: "", country: "", uwc: "", uni: "", class: i};

            student.name = $(el).children('.views-field-title').text().trim();
            student.country = $(el).children('.views-field-field-country').text().trim();
            student.uwc = $(el).children('.views-field-field-uwc-school').text().trim();
            student.uni = $(el).children('.views-field-field-school').text().trim();

            students.push(student);
            totalcounter += 1;
            evencounter += 1;

        })
        // console.log("year:" + i);
        // console.log("total students:"+totalcounter);
        // console.log("odd students:"+oddcounter);
        // console.log("even students:"+evencounter);
        
    })
    .then(
        () => complete()
    )
    .catch(err => console.log(err));
}


//BASE URL 2
for (let i = 2017; i >= 2004; i--) {

    axios(baseurl2 + (i.toString()))
    .then(resp => {
        const html = resp.data;
        // console.log(html)
        // const students = [];
        

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

            const student = { name: "", country: "", uwc: "", uni: "", class: i};

            student.name = $(el).children('.views-field-title').text().trim();
            student.country = $(el).children('.views-field-field-country').text().trim();
            student.uwc = $(el).children('.views-field-field-uwc-school').text().trim();
            student.uni = $(el).children('.views-field-field-school').text().trim();

            students.push(student);
            totalcounter += 1;
            evencounter += 1;

        })
        // console.log("year:" + i);
        // console.log("total students:"+totalcounter);
        // console.log("odd students:"+oddcounter);
        // console.log("even students:"+evencounter);
        // console.log(students);
        
    })
    .then(
        () => complete()
    )
    .catch(err => console.log(err));
}


app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
const fs = require('fs');
const faker = require('faker');

// var test = "StarRating, ReviewBody, DateTime, Language, usefulButton, funnyButton, coolButton, Businesskey, UserKey";
var test = ''

const genTestData = function() {
   
    // let reviewBody = faker.lorem.paragraphs(faker.random.number({min:1, max:5}))
    // let reviewReformat = reviewBody.split(' ').join(' ');
    for (var i = 0; i < 10; i ++) {
        let randomDate = faker.date.past(10);
        let date = randomDate.toString().split(' ');
        let parsedDate = [date[3],'-',faker.random.number({min:1, max:12}),'-',date[2]].join('') + ' ' + date[4];
        test += `${faker.random.number({min:1, max:5})}\t${faker.lorem.paragraphs(faker.random.number({min:1, max:5}),"\n \r")}\t${parsedDate}\t${faker.random.arrayElement(["Espana","Engrish","Italiano","ChingChong"])}\t${faker.random.number(15)}\t${faker.random.number(15)}\t${faker.random.number(10)}\t${faker.random.number(100)}\t${faker.random.number(500)},`;
    }
}
genTestData();
fs.writeFileSync('test.csv', test);

// test += `${faker.random.number(5)}\t${faker.lorem.paragraphs(faker.random.number(30), "\n \r")}\t${faker.date.past(10)}\t${faker.random.arrayElement(["Espana","Engrish","Italiano","ChingChong"])}\t${faker.random.number(15)}\t${faker.random.number(15)}\t${faker.random.number(10)}\t${faker.random.number(100)}\t${faker.random.number(500)}\n`;

// "\n \r"

// ${faker.lorem.paragraphs(faker.random.number({min:1, max:5}),"\n \r")}
const fs = require('fs');
const faker = require('faker');

let seedDataReviews = '';
let seedDataUsers = '';
let seedDataBusinesses = '';

(function generateReviewsSeedData() {
  for (let i = 0; i < 1000; i++) {
    const randomDate = faker.date.past(10);
    const date = randomDate.toString().split(' ');
    const parsedDate = `${[date[3], '-', faker.random.number({ min: 1, max: 12 }), '-', date[2]].join('')} ${date[4]}`;

    seedDataReviews += `${faker.random.number({ min: 1, max: 5 })}\t${faker.lorem.paragraphs(faker.random.number({ min: 1, max: 5 }), '\n \r')}\t${parsedDate}\t${faker.random.arrayElement(['Spanish', 'English', 'Italian', 'Chinese'])}\t${faker.random.number(15)}\t${faker.random.number(15)}\t${faker.random.number(10)}\t${faker.random.number(100)}\t${faker.random.number(500)}*`;
  }
}());

(function generateUsersSeedData() {
  for (let i = 0; i < 500; i++) {
    seedDataUsers += `${faker.name.findName()}\t${faker.address.city()}, ${faker.address.stateAbbr()}\t${faker.random.number(1000)}\t${faker.random.number(300)}\t${faker.random.number(50)}\t${faker.image.avatar()}\t${faker.random.arrayElement(["Elite '18", null, null, null, null, null, null, null])}*`;
  }
}());

(function generateBusinessesSeedData() {
  for (let i = 0; i < 100; i++) {
    seedDataBusinesses += `${faker.company.companyName(0)}*`;
  }
}());

fs.writeFileSync('./database/seedFiles/reviews.csv', seedDataReviews);
fs.writeFileSync('./database/seedFiles/users.csv', seedDataUsers);
fs.writeFileSync('./database/seedFiles/businesses.csv', seedDataBusinesses);

// 'npm run db-start' to create and seed database

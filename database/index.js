const mysql = require('mysql');

const connection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'zelp'
});

connection.connect();

const businessPageReviewsLoading = (businessId, callback) => {
    let queryString = `SELECT * FROM reviews INNER JOIN users 
                       ON reviews.UserKey = users.id
                       WHERE reviews.Businesskey = ${businessId}`;
    connection.query(queryString, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}
//Realized could just sort what I already have back from the business ^, 
//that way wont have to redo a GET request?? WHAT IS BETTER??? Actually, 
//new GET probably better, that way always up to date on new reviews being inserted.

const reviewsSorting = (businessSortParam, callback) => {
    let queryString = `SELECT * FROM reviews INNER JOIN users 
                       ON reviews.UserKey = users.id
                       WHERE reviews.Businesskey = ${businessSortParam[0]}
                       ORDER BY ${businessSortParam[1]}`;
    connection.query(queryString, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}
//Maybe here would be better to just filter from results i already have??\

const reviewsFilter = (businessfilterParam, callback) => {
    let queryString = `SELECT * FROM reviews INNER JOIN users 
                       ON reviews.UserKey = users.id
                       WHERE reviews.Businesskey = ${businessfilterParam[0]}
                       AND reviews.Language = '${businessfilterParam[1]}'`;
    connection.query(queryString, (err, result) => {
        if (err) {
            // callback(err, null);
            console.log(err)
        } else {
            callback(null, result);
        }
    })
}

// const postNewReview = () => {

// }

// module.exports = connection;
module.exports.businessPageReviewsLoading = businessPageReviewsLoading;
module.exports.reviewsSorting = reviewsSorting;
module.exports.reviewsFilter = reviewsFilter;
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
                       INNER JOIN businesses ON reviews.Businesskey = businesses.id
                       WHERE reviews.Businesskey = ${businessId}
                       `;
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

const reviewsFilter = (businessfilterParam, callback) => {
    let queryString = `SELECT * FROM reviews INNER JOIN users 
                       ON reviews.UserKey = users.id
                       WHERE reviews.Businesskey = ${businessfilterParam[0]}
                       AND reviews.Language = '${businessfilterParam[1]}'`;
    connection.query(queryString, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

const postNewReview = (reviewParams, callback) => {
    let queryString = `INSERT INTO reviews (StarRating, ReviewBody, DateTime, Language, Businesskey, UserKey)
                       VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(queryString, reviewParams, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

module.exports.businessPageReviewsLoading = businessPageReviewsLoading;
module.exports.reviewsSorting = reviewsSorting;
module.exports.reviewsFilter = reviewsFilter;
module.exports.postNewReview = postNewReview;
const mysql = require('mysql');

const connection = mysql.createConnection({
  // user: 'hellohello810',
  // password: 'porkchop3438',
  // database: 'zelp',
  // host: 'zelp-reviews.cgfgu0rdwoln.us-east-1.rds.amazonaws.com'

  user: 'root',
  password: '',
  database: 'zelp'
});

connection.connect();

const businessPageReviewsLoading = (businessId, callback) => {
  const queryString = `SELECT * FROM reviews INNER JOIN users 
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
};

const reviewsSorting = (businessSortParam, callback) => {
  const queryString = `SELECT * FROM reviews INNER JOIN users 
                       ON reviews.UserKey = users.id
                       WHERE reviews.Businesskey = ${businessSortParam[0]}
                       ORDER BY ${businessSortParam[1]}`;
  connection.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const reviewsFilter = (businessfilterParam, callback) => {
  const queryString = `SELECT * FROM reviews INNER JOIN users 
                       ON reviews.UserKey = users.id
                       WHERE reviews.Businesskey = ${businessfilterParam[0]}
                       AND reviews.Language = '${businessfilterParam[1]}'`;
  connection.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const postNewReview = (reviewParams, callback) => {
  const queryString = `INSERT INTO reviews (StarRating, ReviewBody, DateTime, Language, Businesskey, UserKey)
                       VALUES (?, ?, ?, ?, ?, (SELECT id FROM users WHERE users.id === UserKey?)`;
  connection.query(queryString, reviewParams, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const voteReview = (voteParams, callback) => {
  let votesArr = voteParams[1];
  let promiseArr = [];
  const updateUserVoteCount = (buttonName, count, bizId, userId) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE reviews SET reviews.${buttonName} = ${count}
                         WHERE reviews.BusinessKey = ${bizId} AND reviews.UserKey = ${userId}`;                 
      connection.query(queryString, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  votesArr.forEach((vote) => {
    promiseArr.push(updateUserVoteCount(vote[1], vote[2], voteParams[0], vote[0]))
  });
  Promise.all(promiseArr).then(value => callback(null, value));
};

module.exports.businessPageReviewsLoading = businessPageReviewsLoading;
module.exports.reviewsSorting = reviewsSorting;
module.exports.reviewsFilter = reviewsFilter;
module.exports.postNewReview = postNewReview;
module.exports.voteReview = voteReview;

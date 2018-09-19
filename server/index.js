const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

// GET business page reviews (initial resaturant page = random, or search by id)
app.get('/:id/reviews', (req, res) => {
  db.businessPageReviewsLoading(req.params.id, (err, result) => {
    if (err) {
      console.log('Error: fetch review from db - business id');
    } else {
      // TODO: Need to clean this up
      res.status(201).send(result);
    }
  });
});

// could probabaly learn more about paths and urls...will put on list of todos
app.get('/:id/reviews/reviews_sort/:method', (req, res) => {
  const businessIdParam = [req.params.id, req.params.method.split('_').join(' ')];
  db.reviewsSorting(businessIdParam, (err, result) => {
    if (err) {
      console.log('Error: review sort');
    } else {
      res.status(201).send(result);
    }
  });
});

app.get('/:id/reviews/reviews_filter/:language', (req, res) => {
  const businessIdParam = [req.params.id, req.params.language];
  db.reviewsFilter(businessIdParam, (err, result) => {
    if (err) {
      console.log('Error: review filter');
    } else {
      res.status(201).send(result);
    }
  });
});

app.post('/:id/reviews', (req, res) => {
  const reviewParams = [req.body.StarRating, req.body.ReviewBody, req.body.DateTime, 
                        req.body.Language, req.body.Businesskey, req.body.id];
  db.postNewReview(reviewParams, (err) => {
    if (err) {
      console.log('Error: review POST');
    } else {
      res.sendStatus(201);
    }
  });
});

// one day will link the voter to reviewer. that's for another time.
app.post('/:id/reviews/:userId/:votebutton', (req, res) => {
  const voteParam = [req.params.id, req.params.userId, req.params.votebutton];
  db.voteReview(voteParam, (err) => {
    if (err) {
      console.log('Error: vote');
    } else {
      res.sendStatus(201);
    }
  });
});

app.listen(8080, () => console.log('Server listening on port 8080'));

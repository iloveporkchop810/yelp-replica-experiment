const express = require('express');
const compression = require('compression');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use('/reviews-service/:id', express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get('*/:id/reviews', (req, res) => { 
  db.businessPageReviewsLoading(req.params.id, (err, result) => {
    if (err) {
      console.log('Error: fetch review from db - business id: ', err);
    } else {
      res.status(201).send(result);
    }
  });
});

//no longer in use, instead, sorting is now done frontend
app.get('*/:id/reviews/reviews_sort/:method', (req, res) => { 
  const businessIdParam = [req.params.id, req.params.method.split('_').join(' ')];
  db.reviewsSorting(businessIdParam, (err, result) => {
    if (err) {
      console.log('Error: review sort: ', err);
    } else {
      console.log("RESULT", typeof result);
      res.status(201).send(result);
    }
  });
});

//no longer in use, instead, filtering is now done frontend
app.get('*/:id/reviews/reviews_filter/:language', (req, res) => { 
  const businessIdParam = [req.params.id, req.params.language];
  db.reviewsFilter(businessIdParam, (err, result) => {
    if (err) {
      console.log('Error: review filter');
    } else {
      res.status(201).send(result);
    }
  });
});

//Not in use, mainUser not set up in DB, and posted review is only stored in client state for now. 
app.post('*/:id/reviews', (req, res) => { 
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
app.post('*/:id/reviews/vote', (req, res) => { 
  const voteParam = [req.params.id, req.body];
  db.voteReview(voteParam, (err) => {
    if (err) {
      console.log('Error: vote');
    } else {
      res.sendStatus(201);
    }
  });
});

app.listen(8080, () => console.log('Server listening on port 8080'));

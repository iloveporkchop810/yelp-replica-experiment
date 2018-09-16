const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));


//GET business page reviews (initial resaturant page = random, or search by id)
app.get('/business/:id/reviews', (req, res) => {
    db.businessPageReviewsLoading(req.params.id, (err, result) => {
        if (err) {
            console.log("Error: fetch review from db - business id");
        } else {
            //TODO: Need to clean this up
            res.send(result);
        }
    });    
});

//could probabaly learn more about paths and urls...will put on list of todos
app.get('/business/:id/reviews_sort/:method', (req, res) => {
    var businessIdParam = [req.params.id, req.params.method.split('_').join(' ')];
    db.reviewsSorting(businessIdParam, (err, result) => {
        if (err) {
            console.log("Error: review sort");
        } else {
            res.send(result);
        }
    })
})

app.get('/business/:id/reviews_filter/:language', (req, res) => {
    var businessIdParam = [req.params.id, req.params.language];
    db.reviewsFilter(businessIdParam, (err, result) => {
        if (err) {
            console.log("Error: review filter");
        } else {
            res.send(result);
        }
    })
})

app.post('/business/:id/reviews', (req, res) => {
    var reviewParams = [req.body.star, req.body.reviewbody, req.body.date, req.body.lang, req.body.bkey, req.body.ukey]
    db.postNewReview(reviewParams, (err, result) => {
        if (err) {
            console.log("Error: review POST")
        } else {
            res.sendStatus(201);
        }
    })

})

app.listen(8080, () => console.log(`Server listening on port 8080`));
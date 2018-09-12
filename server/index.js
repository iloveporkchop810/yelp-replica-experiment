const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');


const app = express();

app.use(express.static(path.join(__dirname, '../public')));


// TODO: STATUS CODES


//GET business page reviews (initial resaturant page = random, or search by id)
app.get('/business/:id/reviews', (req, res) => {
    var businessId = req.params.id; 
    db.businessPageReviewsLoading(businessId, (err, result) => {
        if (err) {
            console.log("Error: fetch review from db - business id");
        } else {
            //TODO: Need to clean this up
            console.log(result);
            res.send(result);
        }
    });    
});

//could probabaly learn more about paths and urls...will put on list of todos
app.get('/business/:id/reviews_sort/:method', (req, res) => {

    //NOTE TO SELF for client side: ASC is old to new top down, DESC opposite
    var businessIdParam = [req.params.id, req.params.method.split('_').join(' ')];
    db.reviewsSorting(businessIdParam, (err, result) => {
        if (err) {
            console.log("Error: review sort");
        } else {
            // console.log(result);
            res.send(result);
        }
    })
})

app.get('/business/:id/reviews_filter/:language', (req, res) => {

    var businessIdParam = [req.params.id, req.params.language];
    console.log(businessIdParam);
    db.reviewsFilter(businessIdParam, (err, result) => {
        if (err) {
            console.log("Error: review filter");
        } else {
            // console.log(result);
            res.send(result);
        }
    })
})

// app.post('/business/:id/reviews', (req, res) => {
//     //post reviews
// })

app.listen(8080, () => console.log(`Server listening on port 8080`));
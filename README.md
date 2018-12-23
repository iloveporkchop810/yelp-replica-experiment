# zelp
### Yelp Replica Experiment

#### This is an experimental / functional Yelp replica.

To initialize mySQL with pre-generated data as root user without a password, run:
```
  npm run db-start
```
Otherwise specify the scripts `"db-init"` & `"seed-db"` to include login info, by editing `package.json`
``` 
  vim package.json 
```
and to include login info, edit `database/index.js`
```
  vim database/index.js
```  
  
URL to page = http://localhost:8080/reviews-service/<restaurant_id>

<restaurant_id> = integer 1-100 

* User can sort reviews base on date/rating or language
* User can leave and delete a review 
* User can vote using the vote buttons

The search bar and the linkes to user profiles are non-functioning

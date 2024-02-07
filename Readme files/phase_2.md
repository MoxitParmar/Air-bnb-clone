### the review model
- create the review schema in models -> review.js
- now add this review collection to the listing collection like one-to-many relationship 
- create an review key and store the object.id of the review in listing schema
- now create a form inside the show.ejs for creating a review and learn how we style that review form
- now we submit that form of review to the post route /listings/:id/reviews
- now create the post route 
- after that we create the vvalidation for our reviews like we do for our listings
- we create the joi validation middleware like listingSchema and use that in review routes with wrapAsync

### delete reviews
- create a delete form with delete method that have a button of delete inside the review display cards
- now that delete button held us to delete route and in that route we have apllied a new mongo oprator called $pull to remove the reviews from the reviewId that we have from the route  
- and then we delete it to the review collection also and flash a deletion msg
- and at last redirect

### delete listing with reviews
- create a post mongoose middleware of findbyidanddelete and understand the middleware code from the listing.js model

### routes restructuring 
- make a new folder routes
- make listing.js , review.js and user.js
- you have to require all the stuff that will be used in the routes with a proper path according to the routes folder
- then paste all the routes with replaing app to router
- and dont forget to give the route() first if we use multiple methods like get , delete, post in one router

### using sessions
- install and require express-session and then follow the code comments in app.js
- using flash (success)
  - install and require flash and make a req.flash() msg and then require that msg as res.local variable
  - now we create a ejs file named flash.ejs and in that file we access all our flash msg and style that by bootstrap
  - now inclue that ejs file to right above the body in our boilerplate.ejs file 
  - so now our flash msg shown at that place right above our main body means at the top of our webpage
  - now we can create the flash msg for new listing , update listing , delete listing , review create , delete reveiw
- (failure)
  - create an error key flash msg in show route like we do in our code 
  - and now add it to res.locals variable and flash.ejs styling 
  - we use that msg in wrong listing routes , wrong listing editing 

### users and authors
- we impiment passport middleware for authantication
- so for authorizing users we have to make user model in mongodb -> user.js model
- now add all the required things in app.js
- and after that we create our signup get route for the form and after that we create a post route to post that form data
- we created our user.js model , routes and controlers
- now after creating all the setup for signup we create the login get and post routes
- now create a authantication middlewares for reveiw and listings and assign that middleware where it needed
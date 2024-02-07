### The baisc setup 

- inatall expressjs , mongoose and new_package and require it in app.js
- and connect the mongoose db to our servers

### creating listing model
- first we create the listing model which has the schema for our listings (listing.js in models)
- then we export that model 
- now we are able to add data in our db (you have to know how to add data for reff -> visit notion mongoose)

### Initialize listing collection
- in our init folder we have a prebuilt sample data and then we export that data as an array of objects which has all the documents in form of an object
- we import that data to our index.js
- and that file has all the logic for passing that sample data as documents to our listing collection

### Index route
- firstly setup the basics of ejs
- and make a ejs file named index.ejs that we pass for our render
- now we make a listings route that have all the listing data and pass it to the index.js file to render it
- we also create a anchor tag for all our listing cards that has the id of the lisiting pass as data so by that we can create a show page for endividual lisitngs
  
### Show route
- as we pass id by our anchor tag we access the data for that listing
- and pass that data to the show.ejs file and display it

### Create get and post route
- firstly add a anchor button at listing home page that held us to the get route which has new.ejs file that displays a form for adding info for our new lisitng
- and after filling thedata to the form , we submit that form
- and the submition lead us to the psot route and that add the new listing by that form filled data

### Update route
- firstly add a anchor button(with passing the id) in show route that held us to the get(with id) route which has update.ejs file that displays a form for adding newinfo for our lisitng
- then that value is pass to the update route (method override) and update the listing by findByIdAndUpdate()

### Delete route
- add a delete button in show route inside a form that submit to a post route with passing the id for that listing that we wanted to delete
- now make a delete route (method override) (with passing the id)
- and now in that controller delete that listing by findByIdAndDelete()

### Creating boilerplate
- intall ejs-mate packege
- then create a folder named layouts and in that folder create boilerplate.ejs
- then learn how to write the boilerplate code from that ejs file
- then you have to write <%- layout("/layouts/boilerplate") %> at the ejs file to include the boilerplate code in your ejs file
- now we added the common css file in public/css/style.css
  - we have to add some lines in app.js for static file serve like css and js
- now to apply that styling to all the pages we have to link that css file to the boilerplate code

### Navbar (bootstrap)
- firstly include the link from the bootstrap to our boilerplate code so we can attach bootstrap styling in our code
- now make a folder named includes inside the views and in that folder we design our navbar nad footer and the flash messages 
- and include that files in our boilerplate code 
- in navbar.ejs learn how we create the navbar from the code
- now for include icons in our navbar we have to paste the link from the icon website font awosome 
- and to impliment that we have to include the font-awasome cdn link in our boilerplate code 
- now we added some styling in our navbar from style.css 
- for making our navbar stick to the top we added sticky-top class in our nav tag in navbar.ejs

### Footer (bootstrap)
- make a footer.ejs file and include it to the boilerplate like we do in navbar
- in footer.ejs learn how we create the navbar from the code
- now we added some styling in our footer from style.css 

### index cards (bootstrap)
- for that include the cards code form bootstrap and apply that in our index.ejs page
- now learn how we impliment the cards from the code and how we give styling in style.css

### new listing form (bootstrap) (new.ejs)
- we have to create a form and in that form 
- we have lable and an input tag  which is covered by an div
- we do this div taggin for all our input data members
- we must have to give form-lable and form-control classes to our labels and input t give bootstrap styling
- now learn how we manage the spacing in that form from the new.ejs page

### edit form (bootstrap , edit.ejs)
- firstly we create the form like we make on the new.ejs
- this page is similar to the new listings in terms of styling so learn it through the codes

### show page styling
- copy the card code from the bootstrap web 
- and assign the image to the coard template with some placement styles
- in this project we give all the placement manangement through the row and col type of classes it is the common bootstrap styling 
  
### client side validation
- set all the datamembers except image input to required in new.ejs
- add needs-validation class and novalidate attribute to the form tag so we get our custom validation styling 
- and to impliment that needs-validation custom styling we have to make that custom validation code in script.js file inside the public folder
- that custom validation code is from the bootstrap web
- now link that script.js file to the boilerplate.ejs at the last of the body tag

### validation text 
- learn it thorugh the new.ejs validation text line comments
- now we can do this both step of client side validation and validation text to the edit.ejs like we do in new.ejs

### custom error handling
- first of all create an custom error message in app.js
- now we create utils folder and create wrapAsync.js file
- and we know how the wrapasync function work (for revise it -> go to the notion) 
- now write that wrapAsync code and require that file in app.js
- now put all the constrollers inside a wrapasync as an function argument
- so by that we can impliment our custom error handers which always says that message we pass to the app.js custom error message

### Express error 
- the problem with the above is that it only show one type of message to all our errors and we dont want that so it is the solution
- first of all create a ExpressErr.js file inside the utils and learn the code inside that 

### error.ejs
- we style our custom errors in that page
- so we render that error.ejs in the app.use(err route) and pass err 
- now we copy the error alert from the botstrap and customize it 
- learn how that works from the code

### server side(backend) validation
- in backend we still able to create a listing with empty data info so we need to validate that also
- so for validating the backend we use joi.api 
- firstly we install this npm package and create a file schema.js
- now learn the code from that file
- then require the listingSchema 

### how to convert our val. schema into a middleware
- create a function called validateListing with the server side validation code pasted inside the function
- and we use that middleware in listing routes folder

### mvc design pattern
- in this design we make models, views and controllers directory
- models -> storeing database model
- views -> all the rendering ejs files
- controlers -> backend core functionality that we defined under routes
- now learn hwo to make controllers from the controllers code comments in listing.js controllers
- after that designing our code with mvc we add starability.css from-github rating styles
- we created a rating.css and paste the code from the github page and include this css in boilerplate 
  
### image upload
- we cant upload img file to our forms we only have to give them links
- so first of all we have to make our form capable for accept img files
- and then we have to store that img on cloud , the could then convert that image to url and that url saves in our mongodb
- file accepting form
  - we have to change encodingtype of our form to multipart/form-data by this enctype="multipart/form-data" 
  - now change the type in image inpute to file in the form
  - now after that we can not parse our multipart/form-data in our app.js file
  - so to do that we use multer middleware package , install this package and require it in listing.js routes
- cloudinary setup
  - firstly we logged in to the clodinary and then create .env file for storing credential info
  - now to access .env data we have to install dotenv package and require and use it in app.js and the index.js (you know)
- usin cloudinary with multer
  - install this packages npm i cloudinary and multer-storage-cloudinary
  - now we have to create a cloudconfig.js file to configure our code with cloudinary
  - in that config file we describe our storage folder and it's type of storing files and export it to listing.js routes
- now we can store the image in cloudenary so we have to convert this img to a link to save it in mongodb
- so to do that we have to modify our image schema
- now we have filename and url ( as a type:string )in our image schema rather then a string
- now learn how to add data to that schema by the code comments 
- after that we make changes in edit.ejs to upload image rather than url and filename that is not userfriendly
- we add upload multer middleware to edit routes of listing.js
- then make changes to the editlisting controller to accept image files
- learn how to preview image in edit form with low resolution from the code comments in listing.js controllers of edit

### using maps api (mapbox)
- login to the mapbox and paste the public token to .env 
- require the basic links to the boilerplate.ejs
- now make a js file to store the script provided at the webpage
- forward geocoding
  - install mapbox sdk package
  - require it in listing.js controller
  - make changes in listing schema for storing the coordinates try to ues geojson schema (it is the standerd way to define coordinates in schema)
  - now store the forward geocoding data to that object geometry
  - learn all that from the listing.js controllers
  - in that i created a forward geocoding for edit also so that updated location reflect on our map

- we added some other styling to our code atlast
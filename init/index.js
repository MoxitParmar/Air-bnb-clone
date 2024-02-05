//basic requires
const mongoose = require("mongoose");
const initdata = require("./data.js")
const Listing = require("../models/listing.js")

//for connect mongoose to our database
const mongo_url = "mongodb://127.0.0.1:27017/theWeeknd";

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });



async function main() {
  await mongoose.connect(mongo_url);
};


const initDB = async () => {

    //for deleting the previous modified or corrupted data 
    //for init only the firstly generated sample data
    await Listing.deleteMany({});
    //saprating all the objects from our sample data by map mathod
    initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "659cd5a5428431eac7c8b063" }))
    //now insert all that objects as document in our listing colletion
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};

//initialis our function
initDB();


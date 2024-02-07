const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//requiring passport-local-mongoose
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

//we have to use this plugin for using passportlocalmongoose
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model(`User`, userSchema);

//what is the main use of passport-local-mongoose package ?
// it create a hashed username and password schema for us so we dont need to defined it like we do in email

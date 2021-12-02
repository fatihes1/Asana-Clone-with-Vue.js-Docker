const Mongooose = require("mongoose");

const UserSchema = new Mongooose.Schema({
    full_name : String,
    password : String,
    email : String,
    profile_image : String,
}, { timestamps: true, versionKey:false});

module.exports = Mongooose.model("user", UserSchema);
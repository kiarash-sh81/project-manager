const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String , required: true , unique: true},
    mobile: {type: String , required: true , unique: true},
    role: {type: [String] , default: ["USER"]},
    email: {type: String, required: true , unique: true},
    password: {type: String , required: true , unique: true},
    profile: {type: String },
    skills: {type: [String] , default: []},
    team: {type: [mongoose.Types.ObjectId] , default: []},
    token: {type: String , default:""}
} , {
    timestamps: true
});

const userModel = mongoose.model("user" , userSchema);

module.exports = {
    userModel
}
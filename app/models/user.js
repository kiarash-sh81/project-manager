const mongoose = require('mongoose');

const InviteRequest = new mongoose.Schema({
    teamID:{type: mongoose.Types.ObjectId , required: true},
    caller: {type: String , required: true},
    requestDate: {type: Date , default: new Date()},
    status:{type: String , default: "pendding"}
})

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
    token: {type: String , default:""},
    inviteRequest:{type : [InviteRequest]}
} , {
    timestamps: true
});

const userModel = mongoose.model("user" , userSchema);

module.exports = {
    userModel
}
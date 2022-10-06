const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {type: String , required: true},
    text: {type: String},
    image: {type: String , default: "/defualt/defualt.png"},
    owner: {type: mongoose.Types.ObjectId , required: true },
    team: {type: mongoose.Types.ObjectId},
    private: {type: Boolean, default: true},
} , {
    timestamps: true
});

const projectModel = mongoose.model("project" , projectSchema);

module.exports = {
    projectModel
}
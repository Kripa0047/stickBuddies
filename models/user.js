var mongoose =require("mongoose");


//schema for Stream
var userSchema =new mongoose.Schema({
    username:String,
    email: {type: String, unique: true, required: true},
    qa:[{ques:String,ans:String,options:[]}],
    sharelink:String


});


module.exports =mongoose.model("User",userSchema);
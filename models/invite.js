var mongoose =require("mongoose");


//schema for Stream
var inviteSchema =new mongoose.Schema({
    userid:String,
    username:String,
    friendid:String,
    friendname:String,
    qa:[{ques:String,ans:String,correctans:String,options:[]}],


});


module.exports =mongoose.model("Invite",inviteSchema);
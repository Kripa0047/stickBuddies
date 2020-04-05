var mongoose =require("mongoose");


//schema for Stream
var inviteSchema =new mongoose.Schema({
    userid:String,
    username:String,
    friendid:String,
    friendname:String,
    correctans:[],
    ans:[],
    friendtype:String,
    score:{type:Number,default:0}


});


module.exports =mongoose.model("Invite",inviteSchema);
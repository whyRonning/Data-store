const {model, Schema}=require("mongoose");

let schema=new Schema({
    name:{type: String,required: true},
    extension:{type:String,required:true},
    user:{type:String,required:true}
});
module.exports=model("imgId",schema);
const mongoose= require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    upvotes:{
        type:Number,
    },
    downvotes:{
        type:Number,
    }
});

module.exports= Comments = mongoose.model("comments",commentSchema);

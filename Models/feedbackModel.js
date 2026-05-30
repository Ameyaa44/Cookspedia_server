const mongoose=require('mongoose')

const feedbackSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
})

const feedbacks=mongoose.model('feedbacks',feedbackSchema)

module.exports=feedbacks
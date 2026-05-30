const mongoose=require('mongoose')

const savedRecipeSchema=new mongoose.Schema({
    recipeId:{
        type:String,
        required:true
    },
    recipeName:{
        type:String,
        required:true
    },
    recipeId:{
        type:String,
        required:true
    },
    recipeImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
})

const savedRecipes=mongoose.model('savedRecipes',savedRecipeSchema)
module.exports=savedRecipes
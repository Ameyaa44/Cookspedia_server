const downloads=require('../Models/donwloadModel')

exports.addRecipeDownload=async(req,res)=>{
    try{
        const {rid}=req.params
        const {recipeName,recipeCuisine,recipeImage}=req.body
        const userId=req.payload
        
        const existingDownload=await downloads.findOne({userId,recipeId:rid})
        if(existingDownload){
            existingDownload.count+=1
            await existingDownload.save()
            res.status(200).json(existingDownload)
        }
        else{
            const newDownload=new downloads({
                recipeId:rid,recipeName,recipeImage,recipeCuisine,userId,count:1
            })
            await newDownload.save()
            res.status(200).json(newDownload)
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.getDownloadedRecipe=async(req,res)=>{
    try{
        const userId=req.payload
        const downloadedList=await downloads.find({userId})
        res.status(200).json(downloadedList)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
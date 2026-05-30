const savedRecipeModel = require("../Models/savedRecipeModel");

exports.addSavedRecipe = async (req, res) => {
  try {
    const { rid } = req.params;
    const { recipeName, recipeImage } = req.body;
    const userId = req.payload;
    const existingRecipe = await savedRecipeModel.findOne({
      userId,
      recipeId: rid,
    });
    if (existingRecipe) {
      res.status(400).json("Recipe Already Saved!!");
    } else {
      const newSavedRecipe = await savedRecipeModel({
        recipeId: rid,
        recipeName,
        recipeImage,
        userId,
      });
      await newSavedRecipe.save();
      res.status(200).json(newSavedRecipe);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getSavedRecipe = async (req, res) => {
  try {
    const userId = req.payload;
    const savedRecipeList = await savedRecipeModel.find({ userId });
    res.status(200).json(savedRecipeList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.deleteSavedRecipe = async (req, res) => {
  try {
    const {srid}=req.params
    const deleteRecipe=await savedRecipeModel.findByIdAndDelete(srid)
    res.status(200).json(deleteRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

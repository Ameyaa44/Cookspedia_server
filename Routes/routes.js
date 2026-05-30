const recipeController=require('../Controllers/recipeController')
const userController=require('../Controllers/userController')
const downloadController=require('../Controllers/downloadController')
const savedRecipeController=require('../Controllers/savedRecipeController')
const feedbackController=require('../Controllers/feedbackController')
const jwtMiddle=require('../Middleware/jwtMiddleware')
const adminjwtMiddle=require('../Middleware/adminJwtMiddleware')

const express=require('express')
const router=express.Router()

//Authentication
router.post('/signup',userController.userSignUp)
router.post('/signin',userController.signIn)
// Feedbacks
router.post('/add-feedback',feedbackController.addFeedback)
router.get('/get-feedbacks',feedbackController.allFeedbacks)

//USER
router.patch('/profile-update',jwtMiddle,userController.profileUpdate)
//Recipes
router.get('/all-recipes',recipeController.getAllRecipes)
router.get('/get-recipe/:id',jwtMiddle,recipeController.getRecipeById)

//Downloads
router.post('/add-download/:rid',jwtMiddle,downloadController.addRecipeDownload)
router.get('/get-downloads',jwtMiddle,downloadController.getDownloadedRecipe)

//Saved recipes
router.post('/save-recipe/:rid',jwtMiddle,savedRecipeController.addSavedRecipe)
router.get('/get-savedrecipe',jwtMiddle,savedRecipeController.getSavedRecipe)
router.delete('/delete-savedrecipe/:srid',jwtMiddle,savedRecipeController.deleteSavedRecipe)

// ADMIN
router.post('/admin/add-recipe',adminjwtMiddle,recipeController.addRecipe)
router.put('/admin/edit-recipe/:rid',adminjwtMiddle,recipeController.editRecipe)
router.delete('/admin/delete-recipe/:rid',adminjwtMiddle,recipeController.deleteRecipe)
router.get('/admin/all-recipes',adminjwtMiddle,recipeController.getAllRecipes)
router.get('/admin/all-feedbacks',adminjwtMiddle,feedbackController.allFeedbacks)
router.get('/admin/all-users',adminjwtMiddle,userController.allUsers)
router.delete('/admin/delete-feedback/:fid',adminjwtMiddle,feedbackController.deleteFeedback)

module.exports=router
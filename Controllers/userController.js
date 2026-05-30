const users=require('../Models/userModal')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.userSignUp=async(req,res)=>{
    try{
        const {email,username,password}=req.body
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(400).json("User Already Exists!")
        }
        else{
            const encryptedaPassword=await bcrypt.hash(password,10)
            const newUser=new users({
                username,email,password:encryptedaPassword,profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.signIn=async(req,res)=>{
    try{
        const {email,password}=req.body
        const existingUser=await users.findOne({email})
        const resolve=await bcrypt.compare(password,existingUser.password)
        console.log(resolve)
        if(resolve){
            const token=jwt.sign({'_id':existingUser._id},process.env.SECRET_KEY)
            res.status(200).json({token,user:existingUser.username,profile:existingUser.profile,role:existingUser.role})
        }
        else{
            res.status(400).json("Invalid Email/Password!")
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.profileUpdate=async(req,res)=>{
    try{
        const userId=req.payload
        const {username,profile}=req.body
        const existingUser=await users.findById(userId)
        existingUser.username=username
        existingUser.profile=profile
        await existingUser.save()
        res.status(200).json(existingUser)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

// ADMIN

exports.allUsers=async(req,res)=>{
    try{
        const userList=await users.find()
        res.status(200).json(userList)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


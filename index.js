require('dotenv').config()

const express=require('express')
const cors=require('cors')
require('./db/connection')
const router=require('./Routes/routes')


const app=express()

app.use(cors())
app.use(express.json())
app.use(router)

const PORT=3000
app.listen(PORT,()=>{
    console.log("Server Running at",PORT)
})
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

//register user
const registerUser = asyncHandler(async(req , res) => {
    const {username , email , password} = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({
        email
    })
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered")
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password , 10);
    console.log(`hashed password : ${hashedPassword}`);
    const user =await User.create({
        username, 
        email,
        password: hashedPassword,
    })

    res.status(201).json(user);
    
})


//login user
const loginUser = asyncHandler(async(req , res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password , user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "100m"}
        );
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("email or password is not valid")
    }

})


//current user
const currentUser = asyncHandler(async(req , res) => {
    res.json(req.user);
})

module.exports = {registerUser , loginUser , currentUser}
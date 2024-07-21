const express=require('express');

const mongoose=require('mongoose')
const User=require('../models/userModel');

const router=express.Router();

//create 
// router.post('/',async (req,res)=>{

//     const {name ,email,age}=req.body ;


//     try {
//         const userData=await User.create({
//             name:name,
//             email:email,
//             age:age
//         })

//         res.status(201).json();

        
//     } catch (error) {
//         console.log("error")
//         res.status(400).json({error:error.message})
        
//     }
    
// })

//create new user
router.post('/', async (req, res) => {
    const { name, email, age } = req.body;

    // Check if name and email are provided
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    try {
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Read operation

router.get('/',async(req,res)=>{

    try{
        const userDetails=await User.find();
        res.status(201).json(userDetails);
    }
    catch(error){
     console.log(error);
     res.status(400).json({error:error.message})
    }
    
})

//read -Get by Id
router.get('/:id',async(req,res)=>{
    
    const {id}=req.params
    try{
        const singleUser=await User.findById({_id:id});
        res.status(201).json(singleUser);
    }
    catch(error){
     console.log(error);
     res.status(400).json({error:error.message})
    }
    
})

//Delete by id
router.delete('/:id',async (req,res)=>{
    const {id}=req.params
    try{
        const singleUser=await User.findByIdAndDelete({_id:id});
        res.status(201).json(singleUser);
    }
    catch(error){
     console.log(error);
     res.status(400).json({error:error.message})
    }
})

//update by id
router.patch('/:id',async (req,res)=>{
    const {id}=req.params;
    const {name ,email,age}=req.body
    try{
        const updateUser=await User.findByIdAndUpdate(id ,req.body,{new:true});
        res.status(201).json(updateUser);
    }
    catch(error){
     console.log(error);
     res.status(400).json({error:error.message})
    }
})


module.exports=router;
const express = require('express');
const router = express.Router();
const med = require("../medicineDB");
const  Jwt = require('jsonwebtoken');
const fs = require('fs')
var secrete = fs.readFileSync('secret.key');




 //*******to get all medicines info in the Data*base******
router.get('/', async (req, res) => {
    
    try{
       const medicineDB = await med.find()
       res.json(medicineDB)
    }catch(err){
         res.json({message:err})
    }

   
    })
 

 // *******add new medicine*******
router.post('/', verifytoken,async (req, res) => {
    Jwt.verify(req.token, secrete,async (err, data)=>{
        if(err){
            res.sendStatus(403);
            console.log('')
        }else{
            const medicineDB = new med({
                medicinename:req.body.medicinename,
                quantity:req.body.quantity,
                price:req.body.price,
                expire_date:req.body.expire_date
            });
            try{
                const savemed = await medicineDB.save();
                res.json(savemed)
            }
            catch{
                res.json("error")
            } 
        }
    })      
})


function verifytoken(req, res, next){
    //format of token => authorization: Bearer<token>
    const bearerheader = req.headers['authorization'];
    if(typeof bearerheader !== 'undefined'){
        //split token
        const bearer = bearerheader.split(' ');
        //get token from array
        const token = bearer[1]
        //set the token
        req.token = token;
        next();
    }else{
        res.sendStatus(403);

    }
}


//******* to search for a medicine by id*******
router.get('/:medId', async  (req, res) => {
    try{
        const sermed = await med.findById(req.params.medId)
        res.json(sermed)
     }catch(err){
          res.json({message:err})
     }
})


 //*******to Update a quantity********
router.put('/:medId' ,async( req ,res )=>
    {
        try{
            const updmed = await med.updateOne({_id : req.params.medId},
                {$set:{quantity:req.body.quantity } })
            res.json(updmed)
         }catch(err){
              res.json({message:err})
         }
    })


 //*******to delete a medicine******
router.delete('/:medId' ,async ( req ,res )=>
{
    
    try{
        const removemed = await med.remove({_id : req.params.medId}
             )
        res.json(removemed )
     }catch(err){
          res.json({message:err})
     }
});
module.exports=router;
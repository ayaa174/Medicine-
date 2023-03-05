const express = require('express')
const router = express.Router();
const user = require("../users");

//*******to get all users in the Database*******
router.get('/', async (req, res) => {
    
    try{
       const users = await user.find()
       res.json(users)
    }catch(err){
         res.json({message:err})
    }
    })
 

    // *******add new user*******
router.post('/', async (req, res) => {
    //     res.json(
    // req.body
    //    );
         
        const users = new user({
            name:req.body.name,
            username:req.body.username,
            password:req.body.password
        });
        try{
            const saveusers=await users.save();
            res.json(saveusers)
        }
        catch{
            res.json("error")
        }
        })
    



//******* to search for a user by username*******
router.get('/:userId', async  (req, res) => {
    try{
        const serusers = await user.findById(req.params.userId)
        res.json(serusers)
     }catch(err){
          res.json({message:err})
     }
})




 //*******to Update a user********
router.put('/:userId' ,async( req ,res )=>
    {
        try{
            const updusers = await user.updateOne({_id : req.params.userId},
                {$set:{name:req.body.name,
                password:req.body.password } })
            res.json(updusers)
         }catch(err){
              res.json({message:err})
         }
    })



 //*******to delete a user******
router.delete('/:userId' ,async ( req ,res )=>
{
    
    try{
        const removeusers = await user.remove({_id : req.params.userId}
             )
        res.json(removeusers )
     }catch(err){
          res.json({message:err})
     }
});
module.exports=router;
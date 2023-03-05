const mongoose = require ('mongoose')



const usersForm = mongoose.Schema({
    name:{
        type :String,
        require:true
    },
    username:{
        type :String || Number,
        require:true
    },
    password:{
        type :Number,
        require:true
    }
})
module.exports = mongoose.model('users' , usersForm);

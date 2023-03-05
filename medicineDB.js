const mongoose = require ('mongoose')



const med = mongoose.Schema({
    medicinename:{
        type :String,
        require:true
    },
    quantity:{
        type : Number,
        require:true
    },
    price:{
        type :Number,
        require:true
    },
    expire_date:{
        type :Number,
        require:true
    }
})
module.exports = mongoose.model('med' , med);
const mongoose = require('mongoose');

const productSchema = ({
    name : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : [true, 'Pice must be Provided'],
    },
    featured : {
        type : Boolean,
        default : false,
    },
    rating : {
        type : Number,
        default : 5.0,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    company : {
        type : String,
        enum : {
            values : ['samsung', 'apple', 'dell', 'hp', 'mi', 'infinix'],
            // message : `${VALUE} is not supported.`,
        },
    },
});

//collections

module.exports = mongoose.model('Product', productSchema);  //model is also known as Constructor
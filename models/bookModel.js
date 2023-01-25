const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,'A book must have a name'],
        trim:true
       
    },
    ISBN:{
        type:String,
        trim:true,
        required:[true,"a book must have an isbn number"]
    },
    author:{
        type:String,
        trim:true,
        required:[true,'A book must have an author'],
    },
    publisher:{
        type:String,
        trim:true
    },
    new:{
        type:Boolean,
        default:false
    },
    publishedDate:{
        type:Date,
    },
    avgRating:{
        type:Number,
        default:8,

    },
    totalRating:{
        type:Number,
        default:0
    },
    bookImage:{
        type:String,
        required:[true,'A book must have an image'],
        trim:true
    },
    quotes:{
        type:[String],

    },
    popularity:{
        type:Number
    },
    synopsis:{
        type:String,
        trim:true,
        required:[true,'A book must have a synopsis']
    },
    genre:{
        type:[String],
        required:[true,'A book must have a genre']
    },
    awards:{
        type:[String]
    },
    criticsReview:{
      type:[String],
      default:"apna kaam karo",
    }
})

const bookModel = mongoose.model('books',bookSchema);

module.exports = bookModel;
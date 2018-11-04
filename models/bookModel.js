//create our ORM for book
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: { type : String },
    author: { type : String },
    genre:{ type : String },
    read: { type : Boolean, default : false },
    date: { type : Date, default : Date.now }
});

module.exports = Book = mongoose.model('Book', BookSchema);
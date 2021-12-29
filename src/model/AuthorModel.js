const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Nayana:Nayana95@ictaktrial.nyh4v.mongodb.net/ERROR_HUNT?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false//part#2 point9
});
const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
    title : String,
    image: String,
    about: String
});

const authordata = mongoose.model('authordata',AuthorSchema);

module.exports = authordata;
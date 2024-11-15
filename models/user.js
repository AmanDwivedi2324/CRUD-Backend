const mongoose = require('mongoose');             //requiring mongoose

mongoose.connect("mongodb://127.0.0.1:27017/testapp1");               // connecting mongoose

const userSchema = mongoose.Schema({                         //creating mongoose Schema 
    image: String,
    email: String,
    name:String
}) 

module.exports = mongoose.model('user',userSchema);             //model creation and exportation
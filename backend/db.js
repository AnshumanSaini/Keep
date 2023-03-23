const mongoose = require('mongoose');

const connectToMongo = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/inotebookDB", {useNewUrlParser: true}).then(()=> console.log("Connection is Successfull...")).catch((err)=> console.log(err));
    }

module.exports = connectToMongo;
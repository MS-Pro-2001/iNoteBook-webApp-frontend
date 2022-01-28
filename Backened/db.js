
// Connect to database (mongodb compass)

const mongoose = require('mongoose');

// const mongoUrl = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const mongoUrl = "mongodb+srv://mridul:-5cH4mAFC-2z7Jb@cluster0.qbivq.mongodb.net/inotebook?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoUrl, ()=>{
        console.log("Connect to database successfully.")
    })
}


module.exports = connectToMongo;
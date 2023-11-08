const mongoose = require("mongoose")
let url = "mongodb+srv://arun:123@cluster0.umihjsg.mongodb.net/dreamhome?retryWrites=true&w=majority"
const connectDB = () => {
    return mongoose.connect(url)
}

module.exports = connectDB;
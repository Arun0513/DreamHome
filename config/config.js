const mongoose = require("mongoose")
let url = "mongodb+srv://arun:1305@cluster0.umihjsg.mongodb.net/dreamhome?retryWrites=true&w=majority"
const connectDB = () => {
    return mongoose.connect(url)
}

module.exports = connectDB;
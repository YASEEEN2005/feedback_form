const mongoose = require('mongoose')

async function connectDb() {
    try {
        await mongoose.connect(`mongodb+srv://muhammadyaseen1907_db_user:uDuCMjTQb4kCm7Xb@cluster0.towti3b.mongodb.net/?appName=Cluster0`)
        console.log("DB Connected")
    } catch (error) {
        console.log("DB is not connected")
    }
}

module.exports = connectDb;
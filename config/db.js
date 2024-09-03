const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(
            `mongodb+srv://3383foramsavaliya:3383foramsavaliya@crud1.37gsqni.mongodb.net/movie-mvc`
        )
        console.log(`MongoDB Connected: ${conn.connection.host}`)

    } catch (error) {
        console.log(error);
        return false;
        
    }
}
module.exports = connectDB;

const mongoose = require("mongoose")
require("dotenv").config();


const uri = process.env.DB_LINK;


const connectDB = async () => {
    try{
        const connection = await mongoose.connect(uri, {
           useUnifiedTopology: true,
           useNewUrlParser: true,
           useCreateIndex: true,
        });
        if(connection)
            console.log("MongoDB Connected");
    }
    catch(err)
    {
        console.error(err);
        process.exit(1);
    }
};

module.exports = { connectDB };
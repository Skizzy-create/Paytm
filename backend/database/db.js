const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// useNewUrlParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true,

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL,);
        console.log('MongoDB connection SUCCESS');
    } catch (e) {
        console.error('MongoDB connection FAIL');
        console.log(e);
    }
};

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel,
    connectDB
}
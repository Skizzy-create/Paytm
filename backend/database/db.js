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

const connectWithRetry = () => {
    return new Promise((resolve, reject) => {
        const connect = () => {
            console.log('Attempting MongoDB connection...');
            mongoose.connect(process.env.MONGO_URL,)
                .then(() => {
                    console.log('MongoDB is connected');
                    resolve();
                })
                .catch(err => {
                    console.error('MongoDB connection unsuccessful, retrying in 2 seconds...');
                    setTimeout(connect, 2000);
                });
        };
        connect();
    });
};

const userSchema = new mongoose.Schema({
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
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

const UserModel = mongoose.model("User", userSchema);
const accountModel = mongoose.model("Account", accountSchema);

module.exports = {
    UserModel,
    connectDB,
    connectWithRetry,
    accountModel
}
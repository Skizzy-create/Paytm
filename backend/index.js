const express = require("express");
const cors = require("cors");
const { connectDB, connectWithRetry } = require("./database/db");
const mainRouter = require("./routes/index");
const { countRequests, countTime } = require("./middlewares/utility");
const cookieParser = require("cookie-parser");

const PORT = 3000;
// connectDB()

// startup section 1
// connectWithRetry();
// const app = express();


// app.use(countRequests);
// app.use(countTime);
// app.use(cookieParser);
// app.use(cors());
// app.use(express.json());

// app.use("/api/v1", mainRouter);

// app.listen(3000, () => {
//     console.log(`Server running on https://localhost:${PORT}`);
// });

// section 2
// if we want the serever to start after the mongo connection is established, use the below setup
const startServer = async () => {
    try {
        await connectWithRetry();
        const app = express();

        app.use(countRequests);
        app.use(countTime);
        app.use(cookieParser());
        app.use(cors());
        app.use(express.json());

        app.use("/api/v1", mainRouter);

        app.get('/', (req, res) => {
            res.status(200).json({
                msg: "Welcome to the Bank API"
            });
        });

        app.get('/users', async (req, res) => {
            const users = await userModel.find({});
            // using map function to send the username, firstname, lastname of the user.
            const userData = users.map((user) => {
                return {
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });

            return res.status(200).json({
                users: userData
            });
        });

        app.listen(PORT, () => {
            console.log(`Server running on https://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
};

startServer();
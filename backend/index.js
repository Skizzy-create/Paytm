const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectDB, connectWithRetry, UserModel, accountModel, } = require("./database/db");
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
        app.use(cors({
            origin: 'http://localhost:5173', // Replace with your frontend domain
            credentials: true
        }));
        app.use(express.json());

        app.use("/api/v1", mainRouter);

        // Serve static files from the frontend/prodTest directory
        app.use('/static', express.static(path.join(__dirname, '..', 'frontend', 'prodTest')));

        // New route to serve the HTML page
        app.get('/displayUsers', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'frontend', 'prodTest', 'index.html'));
        });

        app.get('/', (req, res) => {
            res.status(200).json({
                msg: "Welcome to the Bank API"
            });
        });

        app.get('/users', async (req, res) => {
            const users = await UserModel.find({});
            const userData = users.map((user) => ({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName
            }));
            return res.status(200).json({
                users: userData
            });
        });

        app.get('/accounts', async (req, res) => {
            const accounts = await accountModel.find({});
            return res.status(200).json({
                accounts
            });
        });

        // Global error handler
        app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).json({
                msg: "Internal Server Error",
                error: err
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
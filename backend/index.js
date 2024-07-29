const express = require("express");
const cors = require("cors");
const { connectDB } = require("./database/db");
const mainRouter = require("./Routes/index");
const PORT = 3000;
connectDB()

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(3000, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});
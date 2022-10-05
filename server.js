import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import authRoutes from "./routes/auth.js";
import refreshTokenRoutes from "./routes/refreshToken.js";
import userRoutes from "./routes/users.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

config()
dbConnect();


app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    // res.json({ message: "Welcome!" });
    res.sendFile(__dirname + "/public/index.html");
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

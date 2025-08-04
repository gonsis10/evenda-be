import express from "express";
import cors from "cors";
import { router } from "./routes";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

const allowedOrigins = [process.env.ORIGIN];

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

// SET MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const port = process.env.PORT || 5432;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

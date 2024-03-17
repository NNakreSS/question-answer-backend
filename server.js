import express from "express";
import dotenv from "dotenv";
//? routers
import routers from "./routers/index.js";

//? helpers
import connectDatabase from "./helpers/database/connectDatabase.js";

//? middlewares
import customErrorHandler from "./middlewares/errors/customErrorHandler.js";

//? Enviroment variables
dotenv.config({ path: "./config/env/config.env" });

//? MongoDb Connection
connectDatabase();

//? create app
const app = express();

//? json middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

//? default url get
app.get("/", (req, res) => {
  res.send("<h1>Hello Question Answer API</h1>");
});

//? api routers middleware
app.use("/api", routers);

//? Error handler
app.use(customErrorHandler);

app.listen(PORT, () =>
  console.log(`app startet on ${PORT} : ${process.env.NODE_ENV}`)
);

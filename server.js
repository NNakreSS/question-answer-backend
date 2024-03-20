import express from "express";
import path from "path";
import dotenv from "dotenv";
//? routers
import routers from "./routers/index.js";

//? helpers
import connectDatabase from "./helpers/database/connectDatabase.js";

//? middlewares
import customErrorHandler from "./middlewares/errors/customErrorHandler.js";
import listEndpoints from "express-list-endpoints";

//? Enviroment variables
dotenv.config({ path: "./config/env/config.env" });

//? MongoDb Connection
connectDatabase();

//? create app
const app = express();

//? json middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

//? views
app.set("views", path.join(process.cwd(), "views"));
// ejs engine
app.set("view engine", "ejs");

//? default url get - view routes
app.get("/", (req, res) => {
  const allroutes = listEndpoints(app);
  const routes = {};
  allroutes.forEach((route) => {
    routes[route.methods[0]] = routes[route.methods[0]]
      ? [...routes[route.methods[0]], route.path]
      : [route.path];
  });
  console.log(routes);
  res.render("routes", { routes });
});

//? api routers middleware
app.use("/api", routers);

//? Error handler
app.use(customErrorHandler);

//? static files
app.use(express.static(path.join(process.cwd(), "public")));

app.listen(PORT, () =>
  console.log(`app startet on ${PORT} : ${process.env.NODE_ENV}`)
);

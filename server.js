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

//? default url get
app.get("/", (req, res) => {
  //get all routes
  const routes = listEndpoints(app);
  // create HTML
  let html =
    "<html><head><style>table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; } th { background-color: #f2f2f2; } .get { background-color: #c0e4ff; } .post { background-color: #cff4d2; } .put { background-color: #ffefc0; } .delete { background-color: #ffc0cb; }</style></head><body>";
  html += "<h1>API Routs</h1>";
  html += "<table><tr><th>Metod</th><th>Rota</th></tr>";
  routes.forEach((route) => {
    const method = route.methods.join(", ").toUpperCase();
    const colorClass = method.toLowerCase();
    html += `<tr class="${colorClass}"><td>${method}</td><td>${route.path}</td></tr>`;
  });
  html += "</table></body></html>";

  // send client to HTML
  res.send(html);
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

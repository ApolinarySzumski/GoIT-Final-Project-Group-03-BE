// npm modules
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// my modules
import authRoute from "./routes/auth.js";
import ingredientsRoute from "./routes/ingredients.js";
import othersRoute from "./routes/others.js";
import ownRecipesRoute from "./routes/ownRecipes.js";
import recipesRoute from "./routes/recipes.js";
import searchRoute from "./routes/search.js";
import swaggerDocs from "./utils/swagger.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(morgan(formatsLogger));
app.use(
  "/thumbnails",
  express.static(path.join(__dirname, "public/thumbnails")),
);
app.use("/previews", express.static(path.join(__dirname, "public/previews")));

app.use("/", othersRoute);
app.use("/ingredients", ingredientsRoute);
app.use("/recipes", recipesRoute);
app.use("/users", authRoute);
app.use("/ownRecipes", ownRecipesRoute);
app.use("/search", searchRoute);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, _, res, __) => {
  res.status(500).json({ message: error.message });
});

const PORT = process.env.PORT || 8000;
const uriDb = process.env.DB_HOST;

// Funtion used to connection with database and running server
const connect = async () => {
  try {
    await mongoose.connect(uriDb, { dbName: "So-Yummy" });
    app.listen(PORT, () =>
      console.log(`Server running. Use our API on port ${PORT}`),
    );
  } catch (error) {
    console.log(`Something went wrong, full error is: ${error}`);
    process.exit(1);
  }
};

// Funtion to inform developer about database answers
const registerListeners = () => {
  mongoose.connection.on("connected", () =>
    console.log("Database connection successful"),
  );
  mongoose.connection.on("disconnected", () =>
    console.log("Database connection is broken"),
  );
};

// Calling necessary funtions, order of calling is important
registerListeners();
connect();
swaggerDocs(app, PORT);

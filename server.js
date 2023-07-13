import express from "express";
import { RecipeManagement } from "./models";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 4000;

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
    console.log(`Response Status: ${res.statusCode}`);
  });
  next();
});

app.use(express.json());

// Get all the recipes
app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await RecipeManagement.findAll();
    res.status(200).json(allRecipes);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Get a specific recipe
app.get("/recipes/:id", async (req, res) => {
  const recipeId = parseInt(req.params.id, 10);
  try {
    const recipe = await RecipeManagement.findOne({ where: { id: recipeId } });
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).send({ message: "Recipe not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Create a new recipe
app.post("/recipes", async (req, res) => {
  const recipeData = req.body;
  try {
    const newRecipe = await RecipeManagement.create(recipeData);
    res.status(201).json(newRecipe);
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map(e => e.message) });
    }
    console.error(err);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Update a specific recipe
app.patch("/recipes/:id", async (req, res) => {
  const recipeId = parseInt(req.params.id, 10);
  try {
    const [numberOfAffectedRows, affectedRows] = await RecipeManagement.update(
      req.body,
      { where: { id: recipeId }, returning: true }
    );
    if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Recipe not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.error(err);
  }
});

// Delete a specific recipe
app.delete("/recipes/:id", async (req, res) => {
  const recipeId = parseInt(req.params.id, 10);
  try {
    const deleteOp = await RecipeManagement.destroy({ where: { id: recipeId } });
    if (deleteOp > 0) {
      res.status(200).send({ message: "Recipe deleted successfully" });
    } else {
      res.status(404).send({ message: "Recipe not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Listening to the port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

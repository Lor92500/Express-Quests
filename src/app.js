const express = require("express");
const app = express();
app.use(express.json());


const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");


const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

//films
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", validateMovie, movieControllers.postMovie); 
app.put("/api/movies/:id", validateMovie, movieControllers.putMovie); 

//users
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);
app.post("/api/users", validateUser, userControllers.postUser); 
app.put("/api/users/:id", validateUser, userControllers.putUser); 

module.exports = app;


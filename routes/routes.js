const express = require("express");
let Router = express.Router();
let userController = require("../controllers/UserController");
let flatController = require("../controllers/FlatController");

//userRoutes
Router.post("/register", userController.createUser);
Router.post("/login", userController.loginUser);
Router.get("/getUserByID",userController.verifyToken,userController.getUserbyID);
Router.get("/getAllUsers",userController.verifyToken, userController.isAdmin, userController.getAllUsers);
Router.delete("/deleteUser/:id", userController.deleteUser);
Router.patch("/updateUser/:id", userController.updateUser);
Router.post("/requestPasswordReset", userController.forgotPassword);
Router.post("/resetPassword/:token", userController.resetPassword);

//flatRoutes
Router.post("/createFlat", flatController.createFlat);
Router.get("/getFlatById/:id", flatController.getflatbyID);
Router.get("/flats", flatController.getAllFlats);
Router.delete("/flats/:id", flatController.deleteFlat);
//update ???

//messageRoutes
Router.post("/createFlat", flatController.createFlat);


module.exports = Router;

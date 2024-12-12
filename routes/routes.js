const express = require("express");
const Router = express.Router();
const userController = require("../controllers/UserController");
const flatController = require("../controllers/FlatController");
const { authenticateToken } = require("../middleware/authMiddleware");

//userRoutes
Router.post("/register", userController.createUser);
Router.post("/login", userController.loginUser);
Router.get("/verifyToken", userController.verifyToken);
Router.get(
  "/getUserByID",
  userController.verifyToken,
  userController.getUserbyID
);
Router.get("/getUser", authenticateToken, userController.getUserData);
Router.get(
  "/getAllUsers",
  userController.verifyToken,
  userController.isAdmin,
  userController.getAllUsers
);
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

module.exports = Router;

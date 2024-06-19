const express=require("express")
const {AuthController}=require("../controllers/auth_controller")
const route=express.Router()

route.get("/login",AuthController.login);
route.post("/register",AuthController.register);
route.post("/generator",AuthController.generateUsername);

module.exports={route}
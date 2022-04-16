import express from "express";
import { getAllUsers, createNewUser } from "../controller/userController.js";

let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/users", getAllUsers); // method GET -> READ data
  router.post('/create-user',createNewUser); // method POST -> CREATE data
  // router.put('/update-user', APIController.updateUser); //method PUT -> UPDATE data
  // router.delete('/delete-user/:id', APIController.deleteUser); //method DELETE -> DELETE data

  return app.use("/api/v1/", router);
};

export default initAPIRoute;

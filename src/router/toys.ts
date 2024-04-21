import express from "express";
import { getAllToys } from "../controllers/toys";

export default (router: express.Router) => {
  router.get("/toys", getAllToys);
};

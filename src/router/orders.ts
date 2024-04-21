import express from "express";
import { getOrderById } from "../controllers/orders";

export default (router: express.Router) => {
  router.post("/orders", getOrderById)
};

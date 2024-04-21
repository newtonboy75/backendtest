import express from "express";
import { getAvailableBarbers } from "../controllers/barbers";

export default (router: express.Router) => {
  router.get("/barbers", getAvailableBarbers);
};

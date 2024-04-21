import express from "express";
import barbers from "./barbers";
import toys from "./toys";

const router = express.Router();

export default (): express.Router => {
  barbers(router);
  toys(router);
  return router;
};

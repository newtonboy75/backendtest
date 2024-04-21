import express from "express";
import { getActiveBarbers, getActiveCustomers } from "../utils/db";


/**
 * 
 * @param req 
 * @param res 
 * @returns list of customers, active barbers and current waiting time
 * frontend, convert seconds to minutes
 * 
        customers: ["Betty Anderson", "Dianne Dy", "Albert Po", "Benjamin F", "Donald T", "Barrack O"],
        barbers: ["Newtonboy", "Jenny"],
        waitingTime: 5400
 * 
 */
export const getAvailableBarbers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const barbers = await getActiveBarbers();
    const customers = await getActiveCustomers()

    let activeBarbers = barbers.length
    let currentCustomers = customers.length
    let currentWaitingTime = (currentCustomers/activeBarbers) * 30

    let data = {
        customers: customers,
        barbers: barbers,
        waitingTime: currentWaitingTime * 60
    }

    return res.status(200).json(data);

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
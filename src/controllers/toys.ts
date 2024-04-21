import { processResponse } from "../utils/responseToJson";

export const getAllToys = async (
  req: any,
  res: any
) => {
  try {
    let url = decodeURI(req.query.url);
    let toyList = await processResponse(url);
    res.send(toyList);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

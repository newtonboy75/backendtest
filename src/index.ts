import express from "express";
import mongoose from "mongoose";
import router from "./router";
import { fetchFtpFilesSchedule, performXmlFileScan } from "./utils/ftpUtil";

const PORT = 3000;
const app = express();

const MONGO_URL: string  = process.env.MONGO_DB_URL as string;
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());

//start scheduled job to fetch files from ftp
fetchFtpFilesSchedule.start()
performXmlFileScan.start()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


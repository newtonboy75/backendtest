import express from "express";
import mongoose from "mongoose";
import router from "./router";
import { fetchFtpFilesSchedule, performXmlFileScan } from "./utils/ftpUtil";

const PORT = 3000;
const app = express();

const MONGO_URL =
  "mongodb+srv://testv:rtyLhHWfzTZ00FaE8@cluster0.uca1gz8.mongodb.net/?retryWrites=true&w=majority";
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


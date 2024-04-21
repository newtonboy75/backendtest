import Client from "ssh2-sftp-client";
import CronJob from "node-cron";
import fsp from "fs/promises"
import { xmlOrderToJson } from "./responseToJson";
import { createOrder } from "./db";

const config = {
  host: process.env.FTP_HOST,
  username: process.env.FTP_USER_NAME,
  password: process.env.FTP_USER_PASSWORD,
};

const sftp = new Client("client");
let remotePath = "/remote/server/path";
const localPath = "/home/toys/xmls";

const options: any = {
  concurrency: 100,
  chunkSize: 32768,
};

//run job every 10 minutes
export const fetchFtpFilesSchedule = CronJob.schedule("*/10 * * * *", () => {
  sftp
    .connect(config)
    .then(() => {
      sftp.list(remotePath).then((file) => {
        sftp.fastGet(remotePath + "/" + file, localPath + "/" + file);
      });
    })
    .then(() => {
      sftp.end();
    })
    .catch((err) => {
      console.error(err.message);
    });
});

/**
 * Runs every 15 minutes
 * Scans directory and save it to the database
 */
export const performXmlFileScan = CronJob.schedule("*/10 * * * *", async () => {
  const basePath = localPath;
  const files = await fsp.readdir(basePath);
  for (let f of files) {
      const xmlData = await fsp.readFile(basePath);
      const json = xmlOrderToJson(xmlData.toString())
      createOrder(json)
  }
});
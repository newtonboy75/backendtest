# backendtest



***Please check router folder for endpoints for each Question Task Number

#Controller:
barbers.ts - fetch all available barbers, current customers and returns 
    let data = {
        customers: customers,
        barbers: barbers,
        waitingTime: currentWaitingTime * 60
    }
orders.ts - listens to order webhook, query orders db from mongoDB and returns data
toys.ts - gets data from provider endpoints and converts result int a json file


#Routes:
index.ts - catch all endpoints
barders.ts - /barbers endpoints
orders.ts - /orders endpoints

Note:

Database - MongoDB
NodeJS
Express
Typescript


#fptUtils.ts **

fetchFtpFilesSchedule - performs a scheduled cron (every 10 mins) job to do remote ftp fetch files to save xml files locally
performXmlFileScan -  automatically scans local folder for xml, convert data into json and saves it to database




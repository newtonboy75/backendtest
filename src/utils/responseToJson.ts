import { parseString } from "xml2js";
import { Product } from "../types/types";

/**
 *
 * @param url (string)
 * @returns
 */
export const processResponse = async (url: string) => {
  try {
    const apiResponse = await fetch(url);
    const contentType = apiResponse.headers.get("content-type");
    const apiResponseString = await apiResponse.text();

    if (contentType == "application/xml") {
      return xmlToJson(apiResponseString);
    } else if (contentType?.indexOf("application/json") !== -1) {
      return JSON.parse(JSON.stringify(apiResponseString));
    } else if (contentType?.indexOf("text/csv") !== -1) {
      return csvToJson(apiResponseString);
    }
  } catch (err) {
    return err;
  }
};

/**
 *
 * @param response (string)
 * @returns
 */
const xmlToJson = (response: string) => {
  let jsonString = "";

  parseString(response, function (err: any, results: {}) {
    let r: any = new Map(Object.entries(results)).get("products");
    let prods = [];

    for (let p in r.product) {
      prods.push({
        name: r.product[p]["name"][0],
        price: r.product[p]["price"][0],
      });
    }
    jsonString = JSON.parse(JSON.stringify({ products: prods }));
  });

  return jsonString;
};

/**
 *
 * @param response (string)
 * @returns
 */
const csvToJson = (response: string) => {
  let prods: Product[] = [];
  let csvArr = response.trim().split("\r\n");
  csvArr.shift()?.split(",")!;

  for (let i = 0; i <= csvArr.length; i++) {
    if (csvArr[i] !== undefined) {
      let values = csvArr[i].split(",");
      prods.push({ name: values[0], price: values[1] });
    }
  }

  return JSON.parse(JSON.stringify({ products: prods }));
};

/**
 *
 * @param response (string)
 * @returns
 */
export const xmlOrderToJson = (response: string) => {
  let jsonString = "";

  parseString(response, function (err: any, results: {}) {
    let r: any = new Map(Object.entries(results)).get("products");
    let order = [];

    for (let p in r.item) {
      order.push({
        orderID: r.item[p]["order_id"][0],
        customer: r.item[p]["customer"][0],
        product: {
          name: r.item[p]["name"][0],
          price: r.item[p]["price"][0],
          qty: r.item[p]["qty"][0]
        }
      });
    }
    jsonString = JSON.parse(JSON.stringify({ order }));
  });

  return jsonString;
};
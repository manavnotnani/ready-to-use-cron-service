import puppeteer from "puppeteer";
import { InternalError } from "web3";
import env from "../config/env";
import logger from "../utils/logger";
// import axios from 'axios';
import Web3Service from "./web3Service";


const web3Service = new Web3Service();




// export const getTokenInfo = async (address: any, chainType: any, name: any = '') => {
//   try {
//     const data: any = {};
//     const network = await getNetwork(chainType);

//     // if (network.chainType == 'BSC') {
//     //   chainType = network.currency;
//     // }
//     const dynamicInstance: any = await web3Service.getInstance('dynamic', network, address)
//     const decimals = await dynamicInstance.methods.decimals().call();
//     const symbol = await dynamicInstance.methods.symbol().call();
//     const name1 = await dynamicInstance.methods.name().call();
//     data[`${name}` + 'address'] = address;
//     data[`${name}` + 'name'] = name1;
//     data[`${name}` + 'symbol'] = symbol;
//     data[`${name}` + 'decimals'] = 10 ** decimals;
//     data[`${name}` + 'chainType'] = chainType;
//     data.type = 'token';
//     const coinGeckoEndpoint = `https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}`;
//     await axios
//       .get(coinGeckoEndpoint)
//       .then(async (response) => {
//         const tokenDetails = await response.data;
//         const tokenIconUrl = await tokenDetails.image.large;
//         data[`${name}` + 'icon'] = tokenIconUrl;
//       })
//       .catch((error) => {
//         logger.error('Error fetching token ICON:');
//         data[`${name}` + 'icon'] = network.icon;
//       });
//     return data;
//   } catch (error: any) {
//     logger.info('getTokenInfo error-----', error);
//     return null;
//   }
// };


export const getNetwork = async (chainType: any) => {
  try {
    if (chainType) {
      const network: any = env.Networks.filter(
        (type: any) => type.chainType.toLowerCase() === chainType.toLowerCase(),
      );
      if (network.length) {
        return network[0];
      }
      return network;
    }
    return null;
  } catch (error: any) {
    logger.info('getNetwork error-----', error);
    throw new Error(error);
  }
};


export const getPastEventsWithRetry = async (
  contractInstance: any,
  contract: string,
  filterOptions: any,
  maxRetries = 3,
  retryDelay = 1000
) => {
  let retries = 0;
  let allEvents: any = {};
  while (retries < maxRetries) {
    try {
      const pastEvents = await contractInstance.getPastEvents(
        "allEvents",
        filterOptions
      );
      allEvents = await concatUniqueByKey(allEvents, pastEvents, contract);
      retries++;
      if (retries === maxRetries) {
        break;
      }
      await delay(retryDelay);
    } catch (error: any) {
      console.error(
        `Error retrieving past events (Attempt ${retries + 1}):`,
        error.message
      );
      retries++;
      if (retries === maxRetries) {
        break;
      }
      await delay(retryDelay);
    }
  }
  const valuesArray: any = Object.values(allEvents);
  const mergedArray: any = [].concat(...valuesArray);
  return mergedArray;
};

export const concatUniqueByKey = async (
  allEvents: any,
  pastEvents: any,
  contract: string
) => {
  let dataObj: any = {};
  for (const obj of pastEvents) {
    const { blockNumber, ...rest } = obj;
    if (!allEvents.hasOwnProperty(blockNumber)) {
      if (!dataObj[blockNumber]) {
        dataObj[blockNumber] = [{ blockNumber, ...rest }];
      } else {
        dataObj[blockNumber].push({ blockNumber, ...rest });
      }
    }
  }
  for (const key in dataObj) {
    if (Object.hasOwnProperty.call(dataObj, key)) {
      if (!allEvents.hasOwnProperty(key)) {
        allEvents[key] = dataObj[key];
      }
    }
  }
  return allEvents;
};

export const delay = (time: any) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const convertBigIntToNumber = async (data: any) => {
  try {
    const convertBigInt = (value: any) => {
      if (typeof value === "bigint") {
        return value.toString().replace(/n$/, "");
      } else if (typeof value === "object") {
        for (let prop in value) {
          value[prop] = convertBigInt(value[prop]);
        }
      }
      return value;
    };

    for (let key in data) {
      data[key] = convertBigInt(data[key]);
    }

    return data;
  } catch (error) {
    logger.error("error", error);
    throw error;
  }
};

/**
 * This function is used to handle the uncaught exception thrown by the application. We can implement logic to how to handle
 *  error.
 */
export default async function handlerejection() {
  try {
    process.on("uncaughtException", (error) => {
      console.log("unhaldled rejection----------->", error);
      logger.error("unhaldled rejection----------->", error);
    });
    process.on("unhandledRejection", (error) => {
      console.log("unhaldled rejection------->", error);
      logger.error("unhaldled rejection------->", error);
    });
  } catch (error) {
    console.log("Uncaught Handler middleware not attached");
    logger.error("Uncaught Handler middleware not attached");
  }
}

export const handleBigNumbers = (
  number1: any,
  number2: any,
  action: string = "sum"
) => {
  try {
    // console.log("number1", number1, "number2", number2, "action", action);
    let bigInt1: any = BigInt(
      number1.toString().includes(".") ? number1.split(".")[0] : number1
    );
    let bigInt2: any = BigInt(
      number2.toString().includes(".") ? number2.split(".")[0] : number2
    );
    let result;
    switch (action) {
      case "sum":
        result = bigInt1 + bigInt2;
        break;
      case "sub":
        result = bigInt1 - bigInt2;
        break;
      case "mul":
        result = bigInt1 * bigInt2;
        break;
      case "div":
        result = bigInt1 / bigInt2;
        break;
      default:
        result = 0;
    }
    let stringValue = result.toString();
    return stringValue;
  } catch (error) {
    logger.error("handleBigNumbers error :>> ", error);
    throw new InternalError(error);
  }
};









import config from "../config/env";
import Web3 from "web3";
import BlockService from "../components/blocks/blockService";
import { DYNAMIC_ABI } from "../abi/dynamicABI";
import logger from "../utils/logger";
import { MASTER_ABI } from "../abi/masterABI";

export default class Web3Service {
  public blockService = new BlockService();
  public web3Instance: any;

  public getInstance = async (
    contract: any,
    network: any,
    dynamicAddress = ""
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        let contractInstance: any;
        this.web3Instance = new Web3(network.rpc);
        if ((contract as string) === "master") {
          contractInstance = new this.web3Instance.eth.Contract(
            MASTER_ABI,
            network.masterAddress
          );
        }else if ((contract as string) === "dynamic") {
          contractInstance = new this.web3Instance.eth.Contract(
            DYNAMIC_ABI,
            dynamicAddress
          );
        }
        resolve(contractInstance);
      } catch (err) {
        logger.info("getInstance error-----", err);
        reject(err);
      }
    });
  };

  public callGetMethod = async (
    method: any,
    data: any,
    contractType: any,
    network: any,
    dynamicAddress = ""
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const contract: any = await this.getInstance(
          contractType,
          network,
          dynamicAddress
        );
        if (contract?.methods) {
          contract.methods[method]
            .apply(null, Array.prototype.slice.call(data))
            .call()
            .then((result: any) => {
              resolve(result);
            })
            .catch((error: any) => {
              reject(error);
            });
        } else {
          reject(new Error("Contract not found."));
        }
      } catch (error) {
        logger.info("callGetMethod error-----", error);
        reject(error);
      }
    });
  };

  public getStartEndBlock = async (
    type: any,
    contractStartBlock: any,
    network: any
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        let fromBlock = contractStartBlock;
        let eventBatchSize: any = config.EVENTBATCHSIZE;
        const blockInfo: any = await this.blockService.getBlockInfo(
          type,
          network.chainType
        );
        if (blockInfo) {
          if (blockInfo.cronInProcess) {
            resolve(false);
          }
          if (blockInfo.lastBlock) {
            fromBlock = (parseInt(blockInfo.lastBlock) + 1).toString();
          }
        }
        const startBlock = fromBlock;
        this.web3Instance = new Web3(network.rpc);
        const currentBlock =
          Number(await this.web3Instance.eth.getBlockNumber()) - 1;
        let endBlock = parseInt(startBlock) + parseInt(eventBatchSize);
        if (endBlock > currentBlock) {
          endBlock = currentBlock;
        }
        resolve({
          startBlock,
          endBlock: endBlock.toString(),
          cronInProcess: blockInfo?.cronInProcess,
        });
      } catch (error) {
        logger.info("getStartEndBlock error-----", error);
        reject(error);
      }
    });
  };
}

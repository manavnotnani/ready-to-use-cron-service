import blocksModel from "./blockModel";
import logger from "../../utils/logger";

export default class BlockService {
  public saveBlockInfo = async (
    contract: any,
    lastBlock: any,
    chainType: any
  ) => {
    try {
      await blocksModel.updateOne(
        { contract, chainType },
        { lastBlock },
        { upsert: true }
      );
    } catch (err) {
      logger.error("saveBlockInfo   error", err);
      throw err;
    }
  };

  public getBlockInfo = async (contract: any, chainType: any) => {
    try {
      let data: any = await blocksModel.findOne({
        contract: contract,
        chainType: chainType,
      });
      return data;
    } catch (err) {
      logger.error("getBlockInfo   error", err);
      throw err;
    }
  };

  public saveUpdateCronStatus = async (
    contract: any,
    chainType: any,
    cronInProcess: any
  ) => {
    try {
      await blocksModel.updateOne(
        { contract, chainType },
        { cronInProcess },
        { upsert: true }
      );
    } catch (err) {
      logger.error("saveUpdateCronStatus   error", err);
      throw err;
    }
  };
}

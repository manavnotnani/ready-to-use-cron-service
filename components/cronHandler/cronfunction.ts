import async from "async";
import Web3Service from "../../common/web3Service";
import BlockService from "../../components/blocks/blockService";
import config from "../../config/env";
import logger from "../../utils/logger";
// import PropertyService from "../../components/Property/service";
import {
  convertBigIntToNumber,
  getPastEventsWithRetry,
} from "../../common/common";
import adModel from "../ad/adModel";
import brandCollabModel from "../ad/brandCollabModel";
export default class CronService {
  public web3Service = new Web3Service();
  public blockService = new BlockService();

  public getMasterEvents = async (network: any) => {
    let blockInfo: any = await this.web3Service.getStartEndBlock(
      "master",
      network.masterBlock,
      network
    );
    if (
      parseInt(blockInfo.startBlock) < parseInt(blockInfo.endBlock) &&
      !blockInfo.cronInProcess
    ) {
      try {
        await this.blockService.saveUpdateCronStatus(
          "master",
          network.chainType,
          true
        );
        let masterInstance: any = await this.web3Service.getInstance(
          "master",
          network
        );
        // const getAllEvents = await masterInstance.getPastEvents("allEvents", {
        //   fromBlock: blockInfo.startBlock,
        //   toBlock: blockInfo.endBlock,
        // });

        const getAllEvents = await getPastEventsWithRetry(
          masterInstance,
          "master",
          {
            fromBlock: blockInfo.startBlock,
            toBlock: blockInfo.endBlock,
          }
        );

        if (getAllEvents.length > 0) {
          await this.blockService.saveBlockInfo(
            "master",
            parseInt(getAllEvents[getAllEvents.length - 1].blockNumber),
            network.chainType
          );
          for (const eventInformation of getAllEvents) {
            eventInformation.returnValues = await convertBigIntToNumber(
              eventInformation.returnValues
            );
            if (eventInformation.event) {
              switch (eventInformation.event) {
                case "AdRegistered":
                  logger.info("AdRegistered--");
                  eventInformation.returnValues.chainType = network.chainType;
                  eventInformation.returnValues.url = network.explorer;
                  eventInformation.returnValues.hash =
                    eventInformation.transactionHash;
                  console.log("eventInformation", eventInformation);
                  const newAd = await new adModel({
                    productName: eventInformation.returnValues.productName,
                    brandAddress: eventInformation.returnValues.brandAddress,
                    budget: eventInformation.returnValues.usdtAmount,
                    adId: eventInformation.returnValues.adId.toString(),
                    numberOfTargetedAds:
                      eventInformation.returnValues.totalUsers,
                  });
                  await newAd.save();
                  break;
                case "AdAccepted":
                  logger.info("AdAccepted--");
                  eventInformation.returnValues.chainType = network.chainType;
                  eventInformation.returnValues.url = network.explorer;
                  eventInformation.returnValues.hash =
                    eventInformation.transactionHash;
                  console.log("eventInformation", eventInformation);
                  const collab = await brandCollabModel.updateOne(
                    {
                      adId: eventInformation.returnValues.adId,
                      influencerAddress:
                        eventInformation.returnValues.influencer,
                    },
                    { acceptedStatus: true }
                  );
                  const adId = eventInformation.returnValues.adId;
                  const acceptedUserAddresses =
                    eventInformation.returnValues.acceptedUserAddress;

                  console.log(
                    "acceptedUserAddresses",
                    acceptedUserAddresses,
                    adId
                  );

                  const ad = await adModel.updateOne(
                    { adId: eventInformation.returnValues.adId },
                    {
                      $set: {
                        acceptedUserAddress:
                          eventInformation.returnValues.acceptedUserAddress,
                      },
                    },
                    { upsert: false } // Ensure no new document is created
                  );

                  console.log("ad", ad);
                  break;
              }
            }
          }
        } else {
          await this.blockService.saveBlockInfo(
            "master",
            parseInt(blockInfo.endBlock),
            network.chainType
          );
        }
        await this.blockService.saveUpdateCronStatus(
          "master",
          network.chainType,
          false
        );
      } catch (error) {
        console.log("error", error);
        logger.error("cron---getMasterEvents error--->", error);
        await this.blockService.saveUpdateCronStatus(
          "master",
          network.chainType,
          false
        );
      }
    }
  };

  public handleAllEvents = async () => {
    async.forEach(config.Networks, this.getMasterEvents);
  };
}

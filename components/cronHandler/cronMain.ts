// import cron from 'node-cron';
import CronService from "./cronfunction";
const cron = require("cron");
import { BlockService } from "../../components/blocks";
import config from "../../config/env";
import async from "async";

class MainService {
  public cronService = new CronService();
  public blockService = new BlockService();

  public getEvents = async () => {
    
    async.forEach(config.Networks, this.setAllCronStatus);

    const job = new cron.CronJob("*/5 * * * * *", () => {
      this.cronService.handleAllEvents();
    });

    job.start();
  };

  public setAllCronStatus = async (networks: any) => {
    await this.blockService.saveUpdateCronStatus(
      "master",
      networks.chainType,
      false
    );
  };
}

export default new MainService();

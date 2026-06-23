const cron = require("node-cron");

const fetchAllNews =
  require("./fetchAllNews");

const startNewsCron = () => {

  cron.schedule(

    "0 */6 * * *",

    async () => {

      console.log(
        "Running Scheduled News Update..."
      );

      await fetchAllNews();

    }

  );

};

module.exports =
  startNewsCron;
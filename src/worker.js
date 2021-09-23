const cron = require("node-cron");
const axios = require("axios");
const redis = require("redis");
const parse = require("./exitAddressesParser.js");

const client = redis.createClient({ host: process.env.REDIS_HOST });

const fetchExitAddresses = async () => {
  const response = await axios.get(process.env.EXIT_ADDRESSES_URL);
  parse(response.data).forEach(
    ({ exitAddress, exitNode, lastStatus, published }) => {
      //set key: address, value: current timestamp
      client.setex(
        exitAddress,
        process.env.REDIS_EXPIRATION_SECONDS,
        JSON.stringify({
          exitNode,
          lastStatus,
          published,
          exitAddress,
        })
      );
    }
  );
};

fetchExitAddresses();

cron.schedule(process.env.CRON_SCHEDULE, fetchExitAddresses);

import axios from "axios";
import cron from "node-cron";
import { Crpto } from "../models/crpto.js";
const fetchAllData = async () => {
  //fetching the data
  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  //storing the data in database
  const storeCryptoData = async (crypto) => {
    const dataToInsert = Object.keys(crypto).map((key) => ({
      id: key === "bitcoin" ? 1 : key === "ethereum" ? 2 : 3,
      name:
        key === "bitcoin"
          ? "Bitcoin"
          : key === "ethereum"
          ? "Ethereum"
          : "Matic",
      symbol: key === "bitcoin" ? "BTC" : key === "ethereum" ? "ETH" : "MATIC",
      price_usd: crypto[key].usd,
      market_cap_usd: crypto[key].usd_market_cap,
      change_24h: crypto[key].usd_24h_change,
      timestamp: new Date(),
    }));
    console.log(dataToInsert);
    const data = await Crpto.create(dataToInsert);
  };

  //fetching the data for every 2 hours
  cron.schedule("0 */2 * * *", async () => {
    console.log("Fetching crypto data...");
    const cryptoData = await fetchCryptoData();
    if (cryptoData) {
      await storeCryptoData(cryptoData);
    }
  });
};
export { fetchAllData };

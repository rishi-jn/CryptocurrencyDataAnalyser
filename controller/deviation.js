import { asyncHandler } from "../asyncHandler.js";
import { Crpto } from "../models/crpto.js";


//calculating deviation
const calculateStandardDeviation = (prices) => {
    const n = prices.length;
    const mean = prices.reduce((a, b) => a + b, 0) / n;
    const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    return Math.sqrt(variance);
};


const deviation = asyncHandler(async (req, res) => {
  const { coin } = await req.body;
  const id =
    coin === "Bitcoin"
      ? 1
      : coin === "Ethereum"
      ? 2
      : coin === "Matic"
      ? 3
      : -1;
  if (id == -1) {
    res.json("Error: No such crpto");
  } else {
    const pricesData = await Crpto.find({ id: id })
      .sort({ timestamp: -1 }).limit(100);
    const prices = pricesData.map((record) => record.price_usd);
    console.log(prices);
    const stdDeviation = calculateStandardDeviation(prices);
    return res.json({"deviation":stdDeviation.toFixed(2)});
  }
});


export { deviation };

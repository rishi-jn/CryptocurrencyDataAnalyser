import { asyncHandler } from "../asyncHandler.js";
import { Crpto } from "../models/crpto.js";


const fetchdata = asyncHandler(async (req, res) => {
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
    const result = await Crpto.find({ id: id }).sort({"timestamp": -1});
    const Res = {
      price: result[0].price_usd,
      marketCap: result[0].market_cap_usd,
      "24hchange": result[0].change_24h,
    };
    console.log(Res);
    return res.json(Res);
  }
});


export { fetchdata };

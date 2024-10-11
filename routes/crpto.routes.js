import { Router } from "express";
import { fetchdata } from "../controller/fetchData.js";
import { deviation } from "../controller/deviation.js";
const router = Router();

// http://localhost:8000/stats
router.route("/stats").post(fetchdata);
router.route("/deviation").post(deviation);

export default router;
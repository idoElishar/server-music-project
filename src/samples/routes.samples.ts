import { Router } from "express";
import samplesController from "./controller.samples";

const router = Router();
router.get("/samples", samplesController.getSamplesByInstrument);
router.put("/samples/:instrument", samplesController.upsertSamplesMap);
export default router;

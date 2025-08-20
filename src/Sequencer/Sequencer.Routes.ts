import { Router } from "express";
import sequencerController from "./Sequencer.Controller";

const router = Router();
router.post("/save-sequencer", sequencerController.saveSequencerState);
router.post("/state/:id", sequencerController.getSequencerStateById);
router.get("/states/:user", sequencerController.getLatestSequencerStateByUser);
router.delete("/state/:id", sequencerController.deleteSequencerState);
export default router;

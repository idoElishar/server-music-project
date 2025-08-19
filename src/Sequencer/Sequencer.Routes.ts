import { Router } from "express";
import sequencerController from "./Sequencer.Controller";

const router = Router();
router.post("/save-sequencer", sequencerController.saveSequencerState);
router.get("/state/:id", sequencerController.getSequencerStateById);
router.get("/states", sequencerController.listSequencerStates);
router.delete("/state/:id", sequencerController.deleteSequencerState);
export default router;

import { Request, Response } from "express";
import sequencerService from "./Sequencer.service";

export const saveSequencerState = async (req: Request, res: Response): Promise<void> => {
  try {
    const p = req.body; 
    const valid =
      p &&
      typeof p.bpm === "number" &&
      typeof p.cols === "number" &&
      typeof p.loopEnabled === "boolean" &&
      typeof p.volumeDb === "number" &&
      p.instrumentsSelected &&
      Array.isArray(p.rows) &&
      Array.isArray(p.grid);

    if (!valid) {
      res.status(400).json({ message: "invalid payload" });
      return;
    }

    const doc = await sequencerService.saveState(p);
    res.status(200).json({ ok: true, id: String(doc._id) });
  } catch (error) {
    console.error("Error saving sequencer state:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSequencerStateById = async (req: Request, res: Response): Promise<void> => {
  try {    
    const userQuery = req.body.user as string ;
    const state = await sequencerService.getStateById(req.params.id,userQuery);
    if (!state) {
      res.status(404).json({ message: "State not found" });
      return;
    }
    res.status(200).json({ ok: true, state });
  } catch (error) {
    console.error("Error fetching state:", error);
    res.status(400).json({ message: "Bad id" });
  }
};

export const getLatestSequencerStateByUser = async (req: Request, res: Response) => {
  try {
    const userName = (req.params.user ) as string;        
    if (!userName) return res.status(400).json({ message: "Missing user" });
    const state = await sequencerService.getLatestStateByUser(userName);
    if (!state) return res.status(404).json({ message: "State not found" });
    res.json({ ok: true, state });
  } catch (e) {
    console.error("Error fetching latest state by user:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSequencerState = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await sequencerService.deleteState(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "State not found" });
      return;
    }
    res.status(200).json({ ok: true, deletedId: req.params.id });
  } catch (error) {
    console.error("Error deleting state:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  saveSequencerState,
  getSequencerStateById,
  getLatestSequencerStateByUser,
  deleteSequencerState,
};

import { Request, Response } from "express";
import samplesService from "./service.samples";
import { InstrumentKey } from "../config/defaultSampleMaps";

const allowed: InstrumentKey[] = ["piano", "guitar", "flute", "drums"];

export const getSamplesByInstrument = async (req: Request, res: Response): Promise<void> => {
  try {
    const instrument = String(req.query.instrument || "").toLowerCase() as InstrumentKey;
    if (!allowed.includes(instrument)) {
      res.status(400).json({ message: "invalid instrument" });
      return;
    }
    const mapping = await samplesService.getSamplesMapping(instrument);
    res.status(200).json({ mapping });
  } catch (error) {
    console.error("Error fetching samples mapping:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const upsertSamplesMap = async (req: Request, res: Response): Promise<void> => {
  try {
    const instrument = String(req.params.instrument || "").toLowerCase() as InstrumentKey;
    const { mapping } = req.body || {};
    if (!allowed.includes(instrument)) {
      res.status(400).json({ message: "invalid instrument" });
      return;
    }
    if (!mapping || typeof mapping !== "object") {
      res.status(400).json({ message: "invalid mapping" });
      return;
    }
    const result = await samplesService.upsertSamplesMapping(instrument, mapping);
    res.status(200).json({ ok: true, mapping: result });
  } catch (error) {
    console.error("Error upserting samples mapping:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getSamplesByInstrument,
  upsertSamplesMap,
};

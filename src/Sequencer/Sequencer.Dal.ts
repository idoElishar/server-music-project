import { SequencerStateModel } from "./Sequencer.model";

export type SavePayload = {
  bpm: number;
  cols: number;
  loopEnabled: boolean;
  volumeDb: number;
  instrumentsSelected: { piano: boolean; drums: boolean; guitar: boolean; flute: boolean };
  rows: string[];
  grid: boolean[][];
  savedAt?: number;
};

async function createState(payload: Omit<SavePayload, "savedAt"> & { savedAt?: number }) {
  const doc = await SequencerStateModel.create({
    ...payload,
    savedAt: payload.savedAt ? new Date(payload.savedAt) : new Date(),
  });
  return doc;
}

async function findById(id: string) {
  return SequencerStateModel.findById(id).lean();
}

async function list(limit: number) {
  return SequencerStateModel.find({}).sort({ createdAt: -1 }).limit(limit).lean();
}

async function deleteById(id: string) {
  const res = await SequencerStateModel.findByIdAndDelete(id).lean();
  return !!res;
}

export default {
  createState,
  findById,
  list,
  deleteById,
};

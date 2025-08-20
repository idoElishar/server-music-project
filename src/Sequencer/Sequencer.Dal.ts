import { SequencerStateModel } from "./Sequencer.model";
import mongoose from "mongoose";

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


function normalizeUserName(u: unknown): string | undefined {
  if (u == null) return undefined;
  const s = String(u)
    .replace(/^[\"']+|[\"']+$/g, "")          
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .trim();
  return s;
}

export async function createState(
  payload: Omit<SavePayload, "savedAt"> & { savedAt?: number }
) {
  const { userName, ...rest } = payload as any;
  const cleanUserName = normalizeUserName(userName);

  const doc = await SequencerStateModel.create({
    ...rest,
    ...(cleanUserName !== undefined ? { userName: cleanUserName } : {}),
    savedAt: payload.savedAt ? new Date(payload.savedAt) : new Date(),
  });

  return doc;
}



function normalizeUser(u: string) {
  return String(u)
    .replace(/^[\"']+|[\"']+$/g, "")           
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .trim();
}

export async function findById(id: string, user: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  const base = normalizeUser(user);
  const candidates = [base, `"${base}"`, `'${base}'`];

  return SequencerStateModel.findOne({
    _id: new mongoose.Types.ObjectId(id),
    userName: { $in: candidates },
  }).lean();
}


export async function latestByUser(userName: string) {
  const base = normalizeUser(userName);
  
  return SequencerStateModel
    .findOne({ userName: { $in: [base, `"${base}"`, `'${base}'`] }, })
    .sort({ createdAt: -1 }) 
    .lean();
}

export async function findByIdForUser(id: string, userName: string) {
  const base = normalizeUser(userName);
  return SequencerStateModel.findOne({
    _id: id, 
    userName: { $in: [base, `"${base}"`, `'${base}'`] },
  }).lean();
}

async function deleteById(id: string) {
  const res = await SequencerStateModel.findByIdAndDelete(id).lean();
  return !!res;
}

export default {
  createState,
  findById,
  latestByUser,
  deleteById,
};

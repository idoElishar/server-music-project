import { SampleMapModel } from "./samples.model";
import { InstrumentKey } from "../config/defaultSampleMaps";


async function findByInstrument(instrument: InstrumentKey): Promise<{
  instrument: InstrumentKey;
  mapping: Record<string, string> | undefined;
} | null> {
  const doc = await SampleMapModel.findOne({ instrument }).lean();
  if (!doc) return null;

  const raw = (doc as any).mapping;
  const mapping: Record<string, string> | undefined =
    raw instanceof Map ? Object.fromEntries(raw as Map<string, string>)
    : typeof raw === "object" && raw !== null ? (raw as Record<string, string>)
    : undefined;

  return { instrument: doc.instrument as InstrumentKey, mapping };
}


async function upsertByInstrument(
  instrument: InstrumentKey,
  mapping: Record<string, string>
): Promise<{ instrument: InstrumentKey; mapping: Record<string, string> }> {
  const doc = await SampleMapModel.findOneAndUpdate(
    { instrument },
    { instrument, mapping },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();

  const raw = (doc as any).mapping;
  const normalized =
    raw instanceof Map ? Object.fromEntries(raw as Map<string, string>)
    : (raw as Record<string, string>);

  return { instrument: doc!.instrument as InstrumentKey, mapping: normalized };
}

export default {
  findByInstrument,
  upsertByInstrument,
};

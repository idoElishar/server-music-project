import samplesDAL from "./Dal.samples";
import { DEFAULT_SAMPLE_MAPS, InstrumentKey } from "../config/defaultSampleMaps";

async function getSamplesMapping(instrument: InstrumentKey) {
  const doc = await samplesDAL.findByInstrument(instrument);
  if (doc?.mapping && Object.keys(doc.mapping).length > 0) {
    return doc.mapping;
  }
  return DEFAULT_SAMPLE_MAPS[instrument];
}

async function upsertSamplesMapping(instrument: InstrumentKey, mapping: Record<string, string>) {
  const doc = await samplesDAL.upsertByInstrument(instrument, mapping);
  return doc.mapping;
}

export default {
  getSamplesMapping,
  upsertSamplesMapping,
};

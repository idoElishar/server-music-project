import mongoose, { Schema, InferSchemaType } from "mongoose";

const InstrumentsSelectedSchema = new Schema(
  {
    piano: { type: Boolean, default: false },
    drums: { type: Boolean, default: false },
    guitar: { type: Boolean, default: false },
    flute: { type: Boolean, default: false },
  },
  { _id: false }
);

const SequencerStateSchema = new Schema(
  {
    bpm: { type: Number, required: true },
    cols: { type: Number, required: true },
    loopEnabled: { type: Boolean, required: true },
    volumeDb: { type: Number, required: true },
    instrumentsSelected: { type: InstrumentsSelectedSchema, required: true },
    rows: { type: [String], default: [] },      // כותרות השורות כפי שהלקוח שלח
    grid: { type: [[Boolean]], required: true }, // מטריצה rows x cols
    savedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type SequencerStateDoc = InferSchemaType<typeof SequencerStateSchema>;
export const SequencerStateModel = mongoose.model("SequencerState", SequencerStateSchema);

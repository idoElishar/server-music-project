import mongoose, { Schema, InferSchemaType } from "mongoose";

const SampleMapSchema = new Schema(
  {
    instrument: {
      type: String,
      required: true,
      enum: ["piano", "guitar", "flute", "drums"],
      unique: true,
      index: true,
    },
    mapping: {
      type: Map,
      of: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type SampleMapDoc = InferSchemaType<typeof SampleMapSchema>;
export const SampleMapModel = mongoose.model("SampleMap", SampleMapSchema);

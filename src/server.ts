import express from "express";
import cors from "./cors";
import samplesRoutes from "./samples/routes.samples";
import sequencerRoutes from "./Sequencer/Sequencer.Routes";
import { connectToDatabase } from "./connectToDB";
import dotenv from 'dotenv';
import path from "path";

dotenv.config();

export const api = process.env.MONGO || ''

export const app = express();

connectToDatabase();

app.use(express.json({limit: '50mb'}));

app.use(cors)

const port = process.env.PORT || 8008
app.listen(port, () => console.log(`server run in port ${port}!`));

app.use("/samples", express.static(path.join(__dirname, "..", "public", "samples")));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", samplesRoutes);
app.use("/api", sequencerRoutes);


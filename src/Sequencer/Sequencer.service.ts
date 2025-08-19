import sequencerDAL, { SavePayload } from "./Sequencer.Dal";

function sanitizeMatrix(grid: boolean[][], rows: number, cols: number) {
  const safeRows = Math.max(0, Math.min(rows, 256));
  const safeCols = Math.max(1, Math.min(cols, 128));
  const safe = Array.from({ length: safeRows }, (_, r) => {
    const row = Array.isArray(grid[r]) ? grid[r] : [];
    return Array.from({ length: safeCols }, (_, c) => !!row[c]);
  });
  return { safe, safeRows, safeCols };
}

async function saveState(payload: SavePayload) {
  const { safe, safeRows, safeCols } = sanitizeMatrix(payload.grid, payload.rows.length, payload.cols);
  const doc = await sequencerDAL.createState({
    ...payload,
    rows: payload.rows.slice(0, safeRows).map(String),
    grid: safe,
    cols: safeCols,
  });
  return doc;
}

async function getStateById(id: string) {
  return sequencerDAL.findById(id);
}

async function listStates(limit = 10) {
  return sequencerDAL.list(limit);
}

async function deleteState(id: string) {
  return sequencerDAL.deleteById(id);
}

export default {
  saveState,
  getStateById,
  listStates,
  deleteState,
};

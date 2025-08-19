export const DEFAULT_SAMPLE_MAPS = {
    piano: {
      C4: "/samples/piano/C4.mp3",
      D4: "/samples/piano/D4.mp3",
      E4: "/samples/piano/E4.mp3",
      F4: "/samples/piano/F4.mp3",
      G4: "/samples/piano/G4.mp3",
      A4: "/samples/piano/A4.mp3",
      B4: "/samples/piano/B4.mp3",
      C5: "/samples/piano/C5.mp3",
    },
    guitar: {
      E3: "/samples/guitar/E3.mp3",
      A3: "/samples/guitar/A3.mp3",
      D4: "/samples/guitar/D4.mp3",
      G4: "/samples/guitar/G4.mp3",
      B4: "/samples/guitar/B4.mp3",
      E5: "/samples/guitar/E5.mp3",
    },
    flute: {
      C5: "/samples/flute/C5.mp3",
      D5: "/samples/flute/D5.mp3",
      E5: "/samples/flute/E5.mp3",
      F5: "/samples/flute/F5.mp3",
      G5: "/samples/flute/G5.mp3",
      A5: "/samples/flute/A5.mp3",
      B5: "/samples/flute/B5.mp3",
      C6: "/samples/flute/C6.mp3",
    },
    drums: {
      Kick: "/samples/drums/kick.mp3",
      Snare: "/samples/drums/snare.mp3",
      "Hi-Hat": "/samples/drums/hihat.mp3",
    },
  } as const;
  
  export type InstrumentKey = keyof typeof DEFAULT_SAMPLE_MAPS; 
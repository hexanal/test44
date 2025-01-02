import {
  Synth,
  Compressor,
  BitCrusher,
  Tremolo,
  FeedbackDelay,
  PingPongDelay,
  Filter,
  getDestination
} from 'tone';

const EFFECTS = {
  compressor: new Compressor({
    threshold: -6,
    ratio: 3,
    attack: 0.5,
    release: 0.1
  }),
  quickFilter: new Filter({ type: 'lowpass', frequency: 300, rolloff: -12, Q: 3, gain: 0 }),
  filter: new Filter({ type: 'lowpass', frequency: 80, rolloff: -12, Q: 1, gain: 0 }),
  crush: new BitCrusher(8),
  tremolo: new Tremolo({frequency: 20, depth: 0.7, spread: 0, type: 'square'}).start(),
  delay: new FeedbackDelay(0.075, 0.5),
  pingPongDelay: new PingPongDelay('1s', 0.1),
};

class Bleep {
  constructor() {
    this.enabled = false;
    this.loaded = false;
    this.sounds = [];
    this.oscillators = {};
    this.output = getDestination();
  }

  init() {
    if (this.loaded) return Promise.resolve(true);

    return new Promise((resolve) => {
      this.initOscillators();

      this.sounds = this.getSoundBank();
      this.loaded = true;

      resolve(true);
    });
  }

  enable() {
    this.enabled = true;
    this.output.mute = false;
  }

  disable() {
    this.enabled = false;
    this.output.mute = true;
  }

  play(soundId, note = false) {
    if (!this.enabled || !this.sounds) return;

    return this.init()
      .then(() => {
        const fromBank = this.sounds[soundId];
        const sound = typeof fromBank === 'function' && note
          ? fromBank(note)
          : fromBank;

        if (!sound) {
          console.warn(`Could not find sound id: "${soundId}"`);
          return false;
        }

        console.log(sound);

        this.bleep(sound);
      });
  }

  playBurst(soundId, note = false, times = 1, delay = 50) {
    for (let i = 0; i < times; i++) {
      setTimeout( () => this.play(soundId, note), (delay * i) );
    }
  }

  bleep(sound) {
    const { osc, note, duration } = sound;
    const synth = this.oscillators[osc];

    if (!synth) console.error(`Synth ID: "${osc}" doesn't exist`);

    synth.triggerAttackRelease(note, duration);
  }

  getSoundBank() {
    return {
      tick: note => ({ osc: 'filteredSquare', note, duration: 0.02 }),
      blarpNote: note => ({ osc: 'triangle', note, duration: 0.02 }),

      boop: { osc: 'triangle', note: 'B3', duration: 0.02 },
      blarp: { osc: 'triangle', note: 'D3', duration: 0.03 },
      blink: { osc: 'triangle', note: 'D4', duration: 0.05 },

      woaw: { osc: 'sine', note: 'C2', duration: 0.18 },
      womp: { osc: 'sine', note: 'A#1', duration: 0.18 },

      kree: { osc: 'saw', note: 'A2', duration: 0.1 },
      gnuf: { osc: 'sine', note: 'G5', duration: 0.012 },
      gnaf: { osc: 'sine', note: 'G#5', duration: 0.012 },

      gong: { osc: 'gong', note: 'C5', duration: 0.02 },
      canc: { osc: 'pulse', note: 'F1', duration: 0.02 },
      yoohoo: { osc: 'pulse', note: 'G2', duration: 0.1 },
      riil: note => ({ osc: 'sine', note, duration: 0.02 }),

      'select-hover': { osc: 'sine', note: 'D#3', duration: 0.075 },
      'select-click': { osc: 'sine', note: 'E3', duration: 0.1 },
      'select-change': { osc: 'sineWithTremolo', note: 'G#3', duration: 0.3 },
    };
  }

  initOscillators() {
    // # SINE WAVE
    const sine = new Synth({
      oscillator : { type : 'sine' },
      envelope : { attack : 0.005, decay : 0.05, sustain : 0.5, release : 0.01 },
    })
      // .chain(EFFECTS.delay, EFFECTS.crush, this.output);
      .chain(EFFECTS.delay, this.output);

    // # SINE WITH TREM
    const sineWithTremolo =  new Synth({
      oscillator : { type : 'sine' },
      envelope : { attack : 0.005, decay : 0.05, sustain : 0.5, release : 0.01 }
    })
      .chain(EFFECTS.tremolo, this.output);

    const filteredSquare = new Synth({
      oscillator : { type : 'triangle' },
      envelope : { attack : 0.002, decay : 0.1, sustain : 1, release : 0.01 }
    })
      .chain(EFFECTS.tremolo, this.output);
    filteredSquare.portamento = 0.2;

    // # TRIANGLE
    const triangle = new Synth({
      oscillator : { type : 'triangle' },
      envelope : { attack : 0.005, decay : 0.02, sustain : 0.5, release : 0.01 }
    })
      // .chain(EFFECTS.delay, this.output);
      .chain(this.output);

    // # GONG
    const gong = new Synth({
      oscillator : { type : 'sine' },
      envelope : { attack : 0.007, decay : 0.02, sustain : 0.3, release : 0.04 }
    })
      .chain(EFFECTS.crush, this.output);

    // # SAWTOOTH
    const saw = new Synth({
      oscillator : { type : 'sawtooth' },
      envelope : { attack : 0.005, decay : 0.02, sustain : 0.5, release : 0.01 }
    })
      .chain(EFFECTS.crush, EFFECTS.filter, this.output);

    // # SAW WITH TREMOLO
    const sawWithTremolo = new Synth({
      oscillator : { type : 'sawtooth' },
      envelope : { attack : 0.005, decay : 0.02, sustain : 0.5, release : 0.01 }
    })
      .chain(EFFECTS.crush, EFFECTS.tremolo, EFFECTS.filter, this.output);

    const pulse = new Synth({
      oscillator: { type: 'sine' },
      envelope : { attack : 0.01, decay : 0.02, sustain : 0.3, release : 0.5 }
    })
      .chain(EFFECTS.crush, EFFECTS.tremolo, this.output);

    this.oscillators = {
      sine,
      sineWithTremolo,
      filteredSquare,
      triangle,
      gong,
      saw,
      sawWithTremolo,
      pulse,
    };
  }

//   events.subscribe('A11Y_SET_LARGE_FONT', big => {
//     const notes = big ? ['C4', 'C#4', 'D4'] : ['D3', 'C#3', 'C3'];
//     const burst = 3;
//     const delay = 40;
//     const delayBetweenBursts = 170;

//     notes.map((note, i) => {
//       setTimeout( () => playBurst('tick', note, burst, delay), (delayBetweenBursts * (i + 1)) );
//     });
//   });
}

const theBleep = new Bleep();

export default theBleep;

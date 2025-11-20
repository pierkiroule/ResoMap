const fs = require('fs');
const path = require('path');

const sampleRate = 44100;
const duration = 1.2; // seconds
const samples = Math.floor(sampleRate * duration);

const categories = {
  dissonance: [220, 260, 320],
  profondeur: [180, 205, 230],
  mojonance: [340, 380, 420],
};

const outDir = path.join(__dirname, 'src', 'assets', 'sounds');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const createTone = (frequency, fileName) => {
  const dataSize = samples * 2; // 16-bit mono
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // PCM chunk size
  buffer.writeUInt16LE(1, 20); // audio format = PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28); // byte rate
  buffer.writeUInt16LE(2, 32); // block align
  buffer.writeUInt16LE(16, 34); // bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-2.5 * t);
    const value = Math.sin(2 * Math.PI * frequency * t) * 0.6 * envelope;
    buffer.writeInt16LE(Math.round(value * 32767), 44 + i * 2);
  }

  const outPath = path.join(outDir, `${fileName}.wav`);
  fs.writeFileSync(outPath, buffer);
  console.log('Created', outPath);
};

Object.entries(categories).forEach(([category, freqs]) => {
  freqs.forEach((freq, idx) => createTone(freq, `${category}-${idx + 1}`));
});

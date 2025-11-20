import { linesA, linesB, linesC } from '../data/haikus.js';

const randomLine = (lines) => lines[Math.floor(Math.random() * lines.length)];

export function generateHaiku() {
  return [randomLine(linesA), randomLine(linesB), randomLine(linesC)];
}

export default generateHaiku;

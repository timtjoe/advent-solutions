/**
 * @param {{ hand: 'L' | 'R', color: string }[]} gloves
 * @returns {string[]} Colors of matched pairs
 */
function matchGloves(gloves) {
  const gloveColors = gloves.reduce((acc, item) => {
    const color = item.color;
    const hand = item.hand;

    if(!acc[color]) {
      acc[color] = {L:0,R:0};
    }
    acc[color][hand] += 1;
    return acc;
  }, {});

  const matchedColors = [];
  for (const color in gloveColors) {
    const counts = gloveColors[color];
    const pairsFound = Math.min(counts.L, counts.R);

    for (let i = 0; i < pairsFound; i++) {
      matchedColors.push(color);
    }
  }
  return matchedColors;
}

const gloves = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' },
  { hand: 'L', color: 'green' }
]

matchGloves(gloves)
// ["red", "green"]

const gloves2 = [
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'L', color: 'gold' },
  { hand: 'R', color: 'gold' }
]

matchGloves(gloves2)
// ["gold", "gold"]

const gloves3 = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' }
]

matchGloves(gloves3)
// []
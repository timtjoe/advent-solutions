/**
 * @param {string} elf1 - The moves of the first elf
 * @param {string} elf2 - The moves of the second elf
 * @return {number} - The result of the battle
 */
function elfBattle(elf1, elf2) {
  // Code here
  let hp1 = 3 
  let hp2 = 3;
  
  const rounds = Math.min(elf1.length, elf2.length);

  for (let i = 0; i < rounds; i++) {
    const move1 = elf1[i];
    const move2 = elf2[i];

    let damageTo1 = 0
    let damageTo2 = 0;

    if (move2 === 'A' && move1 !== 'B') {
      damageTo1 = 1;
    } else if (move2 === 'F') {
      damageTo1 = 2;
    }

    if (move1 === 'A' && move2 !== 'B') {
      damageTo2 = 1;
    } else if(move1 === 'F'){
      damageTo2 = 2;
    }

    hp1 -= damageTo1;
    hp2 -= damageTo2;

    if(hp1 <= 0 || hp2 <= 0) {
      break;
    }
  }

    if (hp1 <= 0 && hp2 <= 0) {
      return 0
    }

    if (hp1 <= 0) {
      return 2
    }

    if (hp2 <= 0) {
      return 1
    }

    if(hp1 === hp2) {
      return 0;
    }

    if(hp1 > hp2) {
      return 1;
    } else {
      return 2;
    }
  }

  // --- Examples ---
console.log(`'A', 'B' -> ${elfBattle('A', 'B')} (Expected 0)`);
console.log(`'F', 'B' -> ${elfBattle('F', 'B')} (Expected 1)`);
console.log(`'AAB', 'BBA' -> ${elfBattle('AAB', 'BBA')} (Expected 0)`);
console.log(`'AFA', 'BBA' -> ${elfBattle('AFA', 'BBA')} (Expected 1)`);
console.log(`'AFAB', 'BBAF' -> ${elfBattle('AFAB', 'BBAF')} (Expected 1)`);
console.log(`'AA', 'FF' -> ${elfBattle('AA', 'FF')} (Expected 2)`);
console.log(`'F', 'A' -> ${elfBattle('F', 'A')} (Expected 1)`); // F deals 2, A deals 1. HP1=2, HP2=1. Elf 1 wins on HP remaining.
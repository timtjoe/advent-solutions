/**
 * Simulates the path of a gift inside a factory and returns the final outcome.
 *
 * @param {string[]} factory - The factory layout (array of strings).
 * @returns {'completed' | 'loop' | 'broken'} - The result of the simulation.
 */
function runFactory(factory) {
  // Determine the dimensions of the factory grid.
  const rows = factory.length;
  // Assuming all rows have the same length.
  const cols = factory[0].length;

  // 1. Initialize State
  let r = 0; // Current row (starts at 0)
  let c = 0; // Current column (starts at 0)

  // 2. Loop Detection State: Use a Set to store visited coordinates efficiently.
  // Coordinates are stored as strings "row,col".
  const visited = new Set();

  // Add the starting position (0,0) to the visited set.
  visited.add(`${r},${c}`);

  // 3. Simulation Loop: Continue until an exit condition is met.
  while (true) {
    let nr = r; // Next row
    let nc = c; // Next column

    // --- A. Read Current Cell and Determine Next Position ---

    // 4. Broken Check (Initial): Check if the current position is valid *before* reading the move.
    // This handles the first movement that takes the gift off the starting boundary.
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return 'broken';
    }

    const move = factory[r][c];

    // Read move direction and update next potential coordinates (nr, nc).
    switch (move) {
      case '>': nc++; break; // Right
      case '<': nc--; break; // Left
      case '^': nr--; break; // Up
      case 'v': nr++; break; // Down

      case '.':
        // B. Completed Check: Correct exit reached.
        return 'completed';

      default:
        // Should not happen based on problem description, but a fallback is good practice.
        return 'broken';
    }

    // --- C. Update Position and Check for Loop or Broken ---

    // Update current position to the new position.
    r = nr;
    c = nc;

    // Broken Check (Post-move): Check if the new position is outside the boundaries.
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return 'broken';
    }

    // Loop Detection Check: Check if the new position has already been visited.
    const nextCoord = `${r},${c}`;
    if (visited.has(nextCoord)) {
      return 'loop';
    }

    // Record the new position and continue the simulation.
    visited.add(nextCoord);
  }
}

// --- Examples ---
console.log(`runFactory(['>>.'])       -> ${runFactory(['>>.'])} (Expected: completed)`);
console.log(`runFactory(['>>>'])        -> ${runFactory(['>>>'])} (Expected: broken)`);
console.log(`runFactory(['>><'])        -> ${runFactory(['>><'])} (Expected: loop)`);
console.log(`runFactory(['>>v', '..<']) -> ${runFactory(['>>v', '..<'])} (Expected: completed)`);
console.log(`runFactory(['>>v', '<<<']) -> ${runFactory(['>>v', '<<<'])} (Expected: broken)`);
console.log(`runFactory(['>v.', '^..']) -> ${runFactory(['>v.', '^..'])} (Expected: completed)`);
console.log(`runFactory(['v.', '^.'])   -> ${runFactory(['v.', '^.'])} (Expected: loop)`);

/*
Explanation of Loop Check in last example:
Start: (0, 0). Move 'v' -> Visited: {"0,0"}
1. (1, 0). Move '^' -> Visited: {"0,0", "1,0"}
2. (0, 0). Move 'v' -> Visited: {"0,0", "1,0", "0,0"} -> LOOP!
*/
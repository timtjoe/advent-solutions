/**
 * @param {string[][]} board
 * @returns {boolean}
 */
function hasFourInARow(board) {
  const rows = board.length;
  if (rows === 0) return false;
  const cols = board[0].length;

  // Define the 4 directions to check: [rowOffset, colOffset]
  const directions = [
    [0, 1],  // Horizontal (Right)
    [1, 0],  // Vertical (Down)
    [1, 1],  // Diagonal (Down-Right)
    [1, -1]  // Diagonal (Down-Left)
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const color = board[r][c];

      // Skip if light is off
      if (color === '.') continue;

      // Check each of the 4 directions from the current cell
      for (const [dr, dc] of directions) {
        let count = 1;

        // Check the next 3 positions in this specific direction
        for (let i = 1; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;

          // Boundary Check: Ensure we stay inside the matrix
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === color) {
            count++;
          } else {
            break;
          }
        }

        if (count === 4) return true;
      }
    }
  }

  return false;
}

console.log(hasFourInARow([
  ['R', '.', '.', '.'],
  ['.', 'R', '.', '.'],
  ['.', '.', 'R', '.'],
  ['.', '.', '.', 'R']
]))
// true → there are 4 red lights in a ↘ diagonal

console.log(hasFourInARow([
  ['.', '.', '.', 'G'],
  ['.', '.', 'G', '.'],
  ['.', 'G', '.', '.'],
  ['G', '.', '.', '.']
]))
// true → there are 4 green lights in a ↙ diagonal

console.log(hasFourInARow([
  ['R', 'R', 'R', 'R'],
  ['G', 'G', '.', '.'],
  ['.', '.', '.', '.'],
  ['.', '.', '.', '.']
]))
// true → there are 4 red lights in a horizontal line

console.log(hasFourInARow([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
]))
// false → there are no 4 consecutive lights of the same color

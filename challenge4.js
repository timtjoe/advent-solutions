/**
 * @param {string} code - The code to decipher
 * @returns {string} The deciphered PIN
 */
function decodeSantaPin(code) {
  const blocks = [];
  let lastDigit = null;

  const blockRegex = /\[(.*?)\]/g;
  let matches = code.matchAll(blockRegex);
  const digitRegex = /^(\d)([+-]*)$/;

  for (const match of matches ) {
    const blockContent = match[1];
    let currentDigit;
    if(blockContent === '<') {
      if(lastDigit === null) {
        currentDigit = 0;
      } else {
        currentDigit = lastDigit;
      }
    } else {
      const digitMatch = blockContent.match(digitRegex);
      if(!digitMatch) continue;
      let value = parseInt(digitMatch[1],10);
      const ops = digitMatch[2];

      for (const op of ops) {
        if (op === "+") {
          value = (value + 1) % 10;
        } else if (op === "-") {
          value = (value - 1 + 10) % 10;
        }
      } 
      currentDigit = value;
    }
    blocks.push(currentDigit);
    lastDigit = currentDigit;
  }

  if(blocks.length < 4) {
    return null;
  }

  console.log(blocks.splice(0, 4).join(""))
  return blocks.splice(0, 4).join("");
}

decodeSantaPin('[1++][2-][3+][<]')
// "3144"

decodeSantaPin('[9+][0-][4][<]')
// "0944"

decodeSantaPin('[1+][2-]')
// null (only 2 digits)


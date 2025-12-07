function filterGifts(gifts) {
  if (gifts.length === 0) {
    return [];
  } else {
    return gifts.filter(gift => !gift.includes("#"))
  }
}

const gifts1 = ['car', 'doll#arm', 'ball', '#train']
const good1 = filterGifts(gifts1)
console.log(good1)

const gifts2 = ['#broken', '#rusty']
const good2 = filterGifts(gifts2)
console.log(good2)
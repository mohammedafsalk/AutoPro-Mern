export function priceChecker(distance, ranges) {
  let price;
  let flooredDistance = Math.floor(distance);
  for (const range of ranges) {
    const [min, max] = range.range.split("-").map(Number);
    if (flooredDistance >= min && flooredDistance <= max) {
      price = range.price;
      break;
    }
  }
  return price
}

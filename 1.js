function calculatePrice (quality, quantity) {
  let total = 0;
  let discount = 0;
  let finalPrice = 0;

  if (quality === 'A') {
      total = quantity * 4550
      if (quantity > 13) {
          discount = quantity * 231
      }
      if (discount) {
          finalPrice = total - discount
      } else {
          finalPrice = total
      }
  } else if (quality === 'B') {
      total = quantity * 5330
      if (quantity > 7) {
        discount = total * 23 / 100
      }
      if (discount) {
          finalPrice = total - discount
      } else {
          finalPrice = total
      }
  } else if (quality === 'C') {
      total = quantity * 8653
      discount = 'tidak ada promo'
      finalPrice = total
  }
  return `Total Harga: ${total}, Potongan: ${discount}, Total yang harus dibayar: ${finalPrice}`
}

console.log(calculatePrice('B', 14))

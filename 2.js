function sorting(arrNumber) {

  for(var i = 0; i < arrNumber.length; i++) {
    for(var j = i + 1; j < arrNumber.length; j++) {
      if(arrNumber[i] > arrNumber[j]) {
        var swapped = arrNumber[i];
        arrNumber[i] = arrNumber[j];
        arrNumber[j] = swapped
      }
    }
  }
  return arrNumber
}

console.log(sorting([20, 12, 35, 11, 17, 9, 58, 23, 69, 21]));
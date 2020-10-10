function getRndVal(arr){
  var r = Math.floor(Math.random() * arr.length)
  return arr[r];
}
function getRndIx(arr){
  return r = Math.floor(Math.random() * arr.length);

}
function rmIndexFromJagged(jagged,i){
  for ( var arr of jagged){
    arr.splice(i, 1);

  }
}
  function getDigits(number){
  return Math.log(number) * Math.LOG10E + 1 | 0;
}
function sleep(duration,fn) {
	return new Promise(resolve => {
		setTimeout(() => {
      fn();
			resolve();
		}, duration * 1000)
	})
}
function getRandomInt(max, excluding) {
  if(Array.isArray(excluding)){
    i = excluding[0];
    while(excluding.some(x=>x==i))i = Math.floor(Math.random() * Math.floor(max));
    return i;
  }
    if (excluding === undefined)
        return Math.floor(Math.random() * Math.floor(max));
    var i = 0
     i = excluding;
    while (i == excluding)
        i = Math.floor(Math.random() * Math.floor(max));
    return i;
}
function getRandomDecimal(digits,decimals){
  var output = 0;
  for(var i = 0; i < digits ; i++)
    output += Math.round(Math.random()*10)*Math.pow(10,i);
  for(var i = -1; i >= decimals*-1 ; i--)
    output += Math.round(Math.random()*10)*Math.pow(10,i);
return Math.round((output ) * Math.pow(10,decimals)) / Math.pow(10,decimals);
}
function getRandomNumber(digits) {
    if (digits == 1)
        return Math.round(Math.random() * 7 + 2)
    if (digits == 2)
        return Math.round(Math.random() * (8.9) * Math.pow(10, digits - 1) + Math.pow(10, digits - 1))
    if (digits == 3)
        return Math.round(Math.random() * 8.99 * Math.pow(10, digits - 1) + Math.pow(10, digits - 1))
    if (digits >= 4)
        return Math.round(Math.random() * 8.999 * Math.pow(10, digits - 1) + Math.pow(10, digits - 1))
}

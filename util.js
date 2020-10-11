function getRndVal(arr) {
    var r = Math.floor(Math.random() * arr.length)
    return arr[r];
}
function ifRandom(arr){
  return arr[0];
}
function getRndIx(arr) {
    return r = Math.floor(Math.random() * arr.length);

}
var spliceElementsFromJaggedSubset = (jagged,ai,type,range)=>ai.forEach(i=>jagged[i][type].splice(range[0],range[1]));


function reverseElements(foo){
  return createArray(foo.length,foo[foo.length-1],-1);
}
function rmArrayFromJagged(jagged, i) {
    for (var arr of jagged) {
        arr.splice(i, 1);

    }
}
function concatNTimes(initial,val,times){
  for(var k = 0; k < times; k++)
    initial+=val;
  return initial;
}

function getDigits(number) {
    return Math.log(number) * Math.LOG10E + 1 | 0;
}

function sleep(duration, fn) {
    return new Promise(resolve => {
        setTimeout(() => {
            fn();
            resolve();
        }, duration * 1000)
    })
}
function switchElementsFromJagged(jagged,i,j){
  for (var arr of jagged) {
      var foo = arr[i];
      arr[i] = arr[j];
      arr[j]=foo;

  }
}
function getDuration(foo) {
    var output="";
    if (foo >= 3600) {
        var hours = Math.floor(foo / 3600);
        output += hours + " hours ";
        foo%=3600;
    }
    if (foo >= 60) {
        var mins = Math.floor(foo / 60);
        output += mins + " minutes ";
        foo%=60;
    }
    if(foo>0){
        output += Math.round(foo) + " seconds ";
    }
    return output;
}
function createArray(length=100,start=0,increment=1){
  return (new Array(length)).fill(undefined).map((_, i) => increment*i+start)
}
function getRandomInt(max, excluding) {
    if (Array.isArray(excluding)) {
        i = excluding[0];
        while (excluding.some(x => x == i)) i = Math.floor(Math.random() * Math.floor(max));
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

function getRandomDecimal(digits, decimals) {
    var output = 0;
    for (var i = 0; i < digits; i++)
        output += Math.round(Math.random() * 10) * Math.pow(10, i);
    for (var i = -1; i >= decimals * -1; i--)
        output += Math.round(Math.random() * 10) * Math.pow(10, i);
    return Math.round((output) * Math.pow(10, decimals)) / Math.pow(10, decimals);
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

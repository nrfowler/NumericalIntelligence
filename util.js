function RandomElement(arr){
  var r = Math.floor(Math.random() * arr.length)
  return arr[r];
}
function RemoveElement(arr,i){
  for ( var val of arr){
    val.splice(i, 1);

  }

}

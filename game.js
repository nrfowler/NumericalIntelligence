

function changeBlinkMode() {
    blinkMode = !blinkMode;
    loadGame();

}
function setItems(len){
  items=[];

  for (var i = 0; i < len; i++) {
       items.push(getRandomInt(varItems.length, items));
  }
}

function displayData() {

    problem2.legend = "";
    if (verbalMode) {
        smallFont();


        if (prices.length == 0)
            for (var i = 1; i <= varItems.length; i++) prices.push(getRandomDecimal(2, 2));


        if (displaytype == "vlist") {
            var height = varItems.length > dataHeight ? dataHeight : varItems.length;

            for (var i = 0; i < height; i++) {
                j = i;
                while (j < varItems.length) {
                    var spaces = concatNTimes("", " ", 10 - prices[j].toString(base).length - varItems[j].length)

                    problem2.legend += varItems[j] + ':  ' + spaces + prices[j].toLocaleString('en-US') + "   ";
                    j += height;
                }
                problem2.legend += "\n";
            }

        } else if (displaytype == "hlist") {
            for (var i = 0; i < varItems.length; i++)
                problem2.legend += varItems[i] + ': ' + prices[i] + "     ";

        } else if (displaytype == "truckgauges") {
            truckFont();
            problem2.legend += prices[0] + " ";
            problem2.legend += prices[1] + "      ";
            problem2.legend += prices[6] + "    ";
            problem2.legend += prices[7] + "        ";
            problem2.legend += prices[8] + " ";
            problem2.legend += prices[9] + "\n\n";

            problem2.legend += prices[2] + " ";
            problem2.legend += prices[3] + "  ";
            problem2.legend += "                        ";
            problem2.legend += prices[10] + " ";
            problem2.legend += prices[11] + "\n\n";

            problem2.legend += prices[4] + " ";
            problem2.legend += prices[5] + " ";
            problem2.legend += "                        ";
            problem2.legend += prices[12] + " ";
            problem2.legend += prices[13] + "\n";

        } else if (displaytype == "stocks") {
            problem2.legend = "loading"

            problem2.legend = "";
            for (var i = 0; i < varItems.length; i++) {
                problem2.legend += varItems[i] + ':  ' + concatNTimes("", " ", 15 - varItems[i].length-prices[i].toLocaleString('en-US').length) + prices[i].toLocaleString('en-US') + "\n";
            }
                document.getElementById("legend").style.fontSize="30px"


        }
        //varItems = varItems.reverse();

    }
}
function RandIterator(){
  if( randiterator > 10)
    randiterator %= 10
  else ++randiterator;
  return randiterator;
}
function displayQuestion() {
    problem2.desc = varItems[items[0]];
    problem2.answer = prices[items[0]];

    answerKey = varItems[items[0]] + "=" + prices[items[0]];
    for (var i = 1; i < items.length; i++) {
        problem2.desc += ' + ' + varItems[items[i]];
        problem2.answer += prices[items[i]];
        answerKey += " " + varItems[items[i]] + "=" + prices[items[i]];
    }
    problem2.desc += "\n\n"
}


function updateData(i = 1) {
    rand += i;
    if (rand > listnames.length - 1) rand = 0;
    if (IsDataMode("none")) verbalMode = false;
    else verbalMode = true;

    if (!IsDataMode("elements")) {
        clearImages(2);
    }
    else toglVisible(".search");
    if (!verbalMode) {
        //remove me?
        varItems = createArray(100, 1, 1);
        items = createArray(100, 1, 1);
        prices = createArray(100, 1, 1);
    }
    else {
        varItems = listnames[rand];
        displaytype = displaytypelist[rand];

        prices = priceslist[rand];
    }
}

function toglVisible(fff) {
    document.querySelectorAll(fff).forEach(x=>x.style.visibility ="visible" );
}
function togl(xxx,ooo,ppp) {
    xxx = xxx == ooo ? ppp : ooo;
}
function changeDataSource() {
    updateData();
    loadGame();
}

function toggleRandMode() {
    randMode = !randMode;
    document.getElementById('randButton').value = "Random " + (randMode ? "(on)" : "(off)");
}

function changeReviewMode() {
    reviewMode = !reviewMode;
    loadGame();

}

function getRandomItem() {
    return varItems[getRandomInt(varItems.length)];
}

function changeVerbalMode() {
    verbalMode = !verbalMode;
    if (! verbalMode) setDataMode("none");
    if (verbalMode && IsDataMode("none")) rand++;
    updateData(0);
    loadGame(true);

}

function setDataMode(fff) {
    rand = dataNames.findIndex(x => x ==fff);
}

function IsDataMode(fff) {
    return rand == dataNames.findIndex(x => x ==fff);
}

function modeUp() {
    changeMode(1);
}

function modeDown() {
    changeMode(-1);
}

function changeMode(foo) {
    //totalPitches = 0;
    seconds = 0;
    //totalTime=0;
    mode = ((mode + foo) < 0 ? totalModes - 1 : mode + foo) % totalModes;
    loadGame(true);
    // var str1 = "Mode " + mode + ": " + modeTitles[mode];
    // str1 = str1.padEnd(30, '.');
    // document.getElementById("modeDisplay").innerHTML = str1+"\n";

}
function addTitle(title){
  if(modeTitles.every(x=>x!=title)) modeTitles.push(title);
}
function loadLevel() {
    //var foo = document.cookie.split(';');
    //if (foo.length > 0) return foo.find(row => row.startsWith())
    //    ?.split('=')[1];
    var bls = blinkMode ? "_" + "blink" : "";

    modeLevels[mode]= parseInt(localStorage.getItem(modeNames[mode].name + "_" + dataNames[rand]+bls) ?? "1") ;

}
function loadGame(remain = false) {
    answerShown = false;
    document.getElementById('ans').value = null;
    answerKey = "";
    if (randMode == false || remain) {
    } else {
        inarow=0;
        mode = getRndIx(modeNames);
    }
    loadLevel();
        question = modeNames[mode]();
    minTime = 15;
    newFunction();

}

function newFunction() {
    document.querySelector("#problem2").style.fontSize = 100 - document.querySelector("#problem2").textContent.length + "px";
    document.getElementById('blinkButton').value = "Blink " + (blinkMode ? "(on)" : "(off)");
    // document.getElementById('reviewButton').value = "Review " + (reviewMode ? "(on)" : "(off)");
    document.getElementById('verbalButton').value = "Verbal " + (verbalMode ? "(on)" : "(off)");
    // document.getElementById('retainButton').value = "Retain " + (retainMode ? "(on)" : "(off)");
    document.getElementById('dataButton').value = "Data Source: " + dataNames[rand];
}

function gameLevel() {
  return modeLevels[mode];
}

function startTimer() {
    seconds = new Date().getTime() / 1000;
}

function endTimer() {
    return new Date().getTime() / 1000 - seconds;
}

function showQuestion() {
    var problem2e = document.getElementById('bridge');
    problem2e.style.display = "none";
    document.getElementById('bar1').style.display = "block";
    document.getElementById("ans").type = "number";
    document.getElementById('problem2').innerHTML = problem2.desc;
    document.getElementById('legend').innerHTML = problem2.legend;
}

function hideQuestion() {
    if (mode == 0) {
        emptyString = " ";
    } else if (mode == 1) {
        emptyString = " ";
    } else if (mode == 2) {
        emptyString = " ";
    } else if (mode == 3) {
        emptyString = " ";
    } else {
        emptyString = " ";
    }
    document.getElementById('problem2').innerHTML = emptyString;
}

function incrementPoints() {
    var mentalMathThreshold = 5;
    var longerTH = 15;

    inarow++;
    pointDiff = modeLevels[mode];
    points += modeLevels[mode];
    if (inarow > 2) {
        modeLevels[mode]++;
        setLevel();

        inarow = 0;
    }
}

function setLevel() {
    var bls = blinkMode ? "_" +"blink" : "";
    localStorage.setItem( modeNames[mode].name + "_" + dataNames[rand]+bls, modeLevels[mode]);
}

function decrementPoints() {
    var mentalMathThreshold = 5;
    var longerTH = 15;
    inarow=0;
    pointDiff = -1.5 * modeLevels[mode];
    if (penaltyMode)
        points += pointDiff;
    if (modeLevels[mode] > 1) modeLevels[mode]--;
    setLevel();
}




function pauseQ() {
    pausedQ.push(CurrentHP?.content);
}





function changeRetentionMode() {
    retainMode = !retainMode;
    loadGame();
}





function toglReverse(){
  ReverseMode= !ReverseMode;
  document.getElementById('ReverseButton').value = "Reverse " + (ReverseMode ? "(on)" : "(off)");
priceslist[0] = !ReverseMode ?  createArray(18,9,1) : createArray(18,18,-1);

if(mode==0) {
prices = priceslist[0];
  loadGame(true)};
}

function toglBase(){
if(base==10) base=16;
else if( base==16 )base=10;
document.getElementById('base').value = "Base " + base;

  loadGame(true);
}





function incLevel() {
    modeLevels[mode]++;
    setLevel();
    loadGame();
}


async function loadStocks(){
  stocknames = ["D","WMT","AMZN","KO","AAPL","REGN"];
  listnames.push(stocknames);
  displaytypelist.push("stocks");
  priceslist.push(createArray(stocknames.length,1,1));
  dataNames.push("stocks")
  stocks = new Stocks('ARKXWZK7XN8ZWJ0W');
  stockPrices = new Array();
   populateStocks(stocknames);
}
//caller is mode game
function setMode(fff) {
    var xx = arguments.callee.caller;
    if (getModeIndex(xx) == -1) modeNames.push(xx);
    mode = getModeIndex(xx);
    loadLevel();
    minTime = 115;
    newFunction();
}

function getModeIndex(fff) {
    return modeNames.findIndex(x => x == fff);
}

function loadData(name) {
    if (name != "none") verbalMode = true;
  if(!verbalMode){
    varItems=createArray(1000,1,1);
    items = createArray(1000,1,1);
    prices = createArray(1000,1,1);
  }
  else {
      setDataMode(name);
      updateData(0);
}
}
function updateStocks(values) {
    setDataMode("stocks");

    varItems = listnames[rand];
    displaytype = displaytypelist[rand];

    prices = priceslist[rand] = values.map(x => {

        return Array.isArray(x) ? x[0]['open'] : x;
    }
    );


    mode = modeNames.map(x=>x.name.toLowerCase()).findIndex(x=>x.includes("addition"))
    loadGame();
}

function decLevel() {
    if (modeLevels[mode] > 1)
        modeLevels[mode]--;
    setLevel();
    loadGame();
}

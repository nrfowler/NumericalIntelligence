function displayInfo(problem2, input) {
    showQuestion();
    //turn off all timeouts

    for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    if (CurrentHP == null)
        showTime = modeBlinkDuration[mode] * 300 + 1500 * modeLevels[mode];

    if (blinkMode) {
        timeouts.push(window.setTimeout(hideQuestion, showTime));
    }

    if(dataNames[rand]=="elements") displayElementInfo()


    document.getElementById('curMode').innerHTML = input + "<br/>" + lin2 + ermsg;
    document.getElementById('modeDisplay').innerHTML = "Mode " + (mode + 1) + " ";
    document.getElementById('levelDisplay').innerHTML = "Level " + modeLevels[mode];
    document.getElementById('legend').rows = dataHeight;
    ermsg = "";
}

function displayInfoNoHide(problem2, input) {
    var problem2e = document.getElementById('problem2');
    problem2e.innerHTML = problem2.desc;
    var fff = document.getElementById('curMode');
    fff.innerHTML = input + "<br/>" + lin2 + ermsg;
    //document.cookie = fff.innerHTML;

}

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

                    problem2.legend += varItems[j] + ':  ' + spaces + prices[j].toString(base) + "   ";
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
                console.log(prices[i])
                problem2.legend += varItems[i] + ':  ' + prices[i] + "\n";
            }


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
    if(!verbalMode){
      varItems=createArray(100,1,1);
      items = createArray(100,1,1);
      prices = createArray(100,1,1);
    }
    else
  {  varItems = listnames[rand];
    displaytype = displaytypelist[rand];

    prices = priceslist[rand];}
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

    loadGame();

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
    return parseInt(localStorage.getItem(modeNames[mode].name + "_" + dataNames[rand]) ?? "1") ;
   
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
    modeLevels[mode] = loadLevel();
        question = modeNames[mode]();

    minTime = 115;
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
    localStorage.setItem( modeNames[mode].name + "_" + dataNames[rand], modeLevels[mode]);
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

function ReadingRecall() {
    modeTitles[mode] = "progiq";
    modeBlinkDuration.push(9);

    document.getElementById("problem2").style.font = "italic bold 20px arial,serif";
    //TODO: remove useless flashcards
    //TODO: set input bar to text
    document.getElementById("ans").type = "string"
    //startTimer();
    totalPitches++;
    blinkMode = 0;
    total = 0;
    rndI = rndI - 1;
    if (rndI < 0) rndI = sentraw.length - 1;
    problem2 = {
        desc: sentraw[rndI],
        answer: sentraw[rndI]
    };
    displayInfoNoHide(problem2, "Press enter to scroll", "todo: SRS, button for adding");
}



function pauseQ() {
    pausedQ.push(CurrentHP?.content);
}

function appendLog(...params) {
    ermsg += "\n" + params;
    //alert(ermsg);
}


function blackFont() {
    document.getElementById("problem2").style.font = "40px";
    document.getElementById("problem2").style.color = "black";
}

function displayHardProblem() {


    CurrentHP = hpm.sort(function(a, b) {
        return a - b
    })[0];
    blueQuestion();
    problem2.desc = CurrentHP.content;
    problem2.answer = CurrentHP.answer;
    showTime = CurrentHP.showTime;
    appendLog("Loading hard problem " + CurrentHP.docID.substring(1, 4) + ": " + CurrentHP.content + " date: " + new Date(CurrentHP.timestamp).toString() + " seconds ago: " + (CurrentHP.timestamp - Date.now()) / 1000)
    HardProblems = [];
}

function blueQuestion() {

    document.getElementById("problem2").style.font = "bold 30px";
    document.getElementById("problem2").style.color = "blue";
}

function smallFont() {
    document.getElementById("legend").style.font = "italic bold 20px";
}

function truckFont() {
    document.getElementById("legend").style.font = "12px ";
}

function changeRetentionMode() {
    retainMode = !retainMode;
    loadGame();
}




function displayScore(ans2, elapsed) {
    average = points / totalPitches;
    average = average.toFixed(2);
    totalTime += elapsed;
    ans2.innerHTML = '<ul style="list-style-type:none;">' +
        "</li><li>Score: " + pointDiff + "</li><li>Elapsed: " + getDuration(elapsed) +
        ' seconds <br><br><li>Total Points: ' +
        points.toFixed(2) + "</li><li>Average Score: " + average + "</li><li>Total Time: " +
        getDuration(totalTime) + "</li><li>Questions Answered: " + totalPitches + "</li><li>Base: "+base+"</li></ul>";
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

function setColor(color) {
    var answer = document.getElementById('ans');
    var ans2 = document.getElementById('answer2');
    var problem2e = document.getElementById('problem2');
    var bridge = document.getElementById('bridge');
    problem2e.style.color = color
    ans2.style.color = color
    bridge.style.color = color
    answer.style.bordercolor = color
}

function colorFeedback(isRight) {
    if (isRight == "yes") {
        setColor("green");
    } else if (isRight == "slow") {
        setColor("orange");
    } else {
        setColor("red");
    }
    window.setTimeout(
        setColor, 2000, "black");
}

function incLevel() {
    modeLevels[mode]++;
    setLevel();
    loadGame();
}

function displayLevel() {

    document.getElementById("levelDisplay").innerHTML = "Level: " + modeLevels[mode] + " ";
}
async function loadStocks(){
  stocknames = ["D","WMT","AMZN"];
  listnames.push(stocknames);
  displaytypelist.push("stocks");
  priceslist.push(createArray(stocknames.length,1,1));
  dataNames.push("stocks")
  stocks = new Stocks('ARKXWZK7XN8ZWJ0W');
  stockPrices = new Array();
  console.log("load stocks")
   populateStocks(stocknames);
}
function loadData(name){
  if(!verbalMode){
    varItems=createArray(1000,1,1);
    items = createArray(1000,1,1);
    prices = createArray(1000,1,1);
  }
  else{
  rand = dataNames.findIndex(x=>x.includes(name));
  varItems = listnames[rand];
  displaytype = displaytypelist[rand];

  prices = priceslist[rand];
}
}
function updateStocks(values) {
    rand = dataNames.findIndex(x=>x=="stocks");

    varItems = listnames[rand];
    displaytype = displaytypelist[rand];

    prices = priceslist[rand] = values.map(x=>x[0]['open']);
    mode = modeNames.map(x=>x.name.toLowerCase()).findIndex(x=>x.includes("addition"))
    loadGame();
}
 function populateStocks(stockNames) {
    if (!stocksLoading) {
        stocksLoading = true;
        stockNames.forEach((item, i) => {

            stockPrices[i] =  stocks.timeSeries({
                symbol: item,
                interval: '1min',
                amount: 1
            });

        });
        Promise.all(stockPrices).then((values) => {
  updateStocks(values);
});
        stocksLoading = false;

    }



}

function decLevel() {
    if (modeLevels[mode] > 1)
        modeLevels[mode]--;
    setLevel();
    loadGame();
}

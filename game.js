function displayInfo(problem2, input, lin2) {
    showQuestion();
    //turn off all timeouts

    for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    if (CurrentHP == null)
        showTime = modeBlinkDuration[mode] * 300 + 1500 * gameLevel;

    if (blinkMode) {
        timeouts.push(window.setTimeout(hideQuestion, showTime));
    }

    document.getElementById('curMode').innerHTML = input + "<br/>" + lin2 + ermsg;
    //document.getElementById('modeDisplay').innerHTML = "Mode " + (mode+1) + " ";
    document.getElementById('levelDisplay').innerHTML = "Level " + gameLevel ;
    ermsg="";
}

function displayInfoNoHide(problem2, input, lin2) {
    var problem2e = document.getElementById('problem2');
    problem2e.innerHTML = problem2.desc;
    var fff = document.getElementById('curMode');
    fff.innerHTML = input + "<br/>" + lin2 + ermsg;

}

function changeBlinkMode() {
    blinkMode = !blinkMode;
    loadGame();

}
function displayData(){
  items=[];
problem2.legend = "";
  if (verbalMode) {
      smallFont();
      items.push(getRandomInt(varItems.length));
      for(var i = 1; i < gameLevel+1; i++) {
        items.push(getRandomInt(varItems.length, items));
      }

      if(prices.length==0)
        for (var i = 1; i <= varItems.length; i++) prices.push(getRandomDecimal(2,2));


      if(displaytype=="vlist"){
      for (var i = 0; i < varItems.length; i++)
          problem2.legend += varItems[i] + ':  ' + prices[i] + "\n";

        }
      else if (displaytype=="hlist") {
        for (var i = 0; i < varItems.length; i++)
            problem2.legend += varItems[i] + ': ' + prices[i] + "     ";

      }
      else if (displaytype=="truckgauges") {
          truckFont();
            problem2.legend +=  prices[0] + " ";
            problem2.legend += prices[1]+ "      ";
            problem2.legend +=  prices[6]+"    ";
            problem2.legend +=  prices[7]+ "        ";
            problem2.legend +=prices[8]+" ";
            problem2.legend += prices[9]+"\n\n";

            problem2.legend += prices[2] + " ";
            problem2.legend += prices[3] +"  ";
            problem2.legend +="                        ";
            problem2.legend +=  prices[10]+" ";
            problem2.legend +=  prices[11]+"\n\n";

            problem2.legend +=  prices[4] + " ";
            problem2.legend += prices[5] +" ";
            problem2.legend +="                        ";
            problem2.legend +=  prices[12]+" ";
            problem2.legend +=  prices[13]+"\n";

      }
      else if (displaytype == "stocks"){
problem2.legend = "loading"

problem2.legend = "";
for (var i = 0; i < varItems.length; i++){
prices[i]=pricefoo[i][0]['open'];
console.log(prices[i])
  problem2.legend += varItems[i] + ':  ' + prices[i] + "\n";
}


      }
//varItems = varItems.reverse();

  }
}
function displayQuestion(){
  problem2.desc = "\n"+varItems[items[0]];
  problem2.answer = prices[items[0]]
  for (var i = 1; i < items.length; i++){
        problem2.desc +=' + '+ varItems[items[i]] ;
        problem2.answer += prices[items[i]]  }
  problem2.desc +="\n\n"
}
function updateData(){
  rand++;
  if(rand>listnames.length) rand = 0;
  if(rand==3) populateStocks();
  varItems = listnames[rand];
  displaytype=displaytypelist[rand];

  prices = priceslist[rand];
}
function changeDataSource(){
  updateData();
  loadGame();
}
function changeReviewMode() {
    reviewMode = !reviewMode;
    loadGame();

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
function getRandomItem(){
    return varItems[getRandomInt(varItems.length)];
}

function changeVerbalMode() {
    verbalMode = !verbalMode;
    loadGame();

}
function modeUp(){
changeMode(1);
}
function modeDown(){
changeMode(-1);
}
function changeMode(foo) {
    //totalPitches = 0;
    seconds = 0;
    //totalTime=0;
    mode = ((mode + foo) < 0 ? totalModes - 1 : mode + foo) % totalModes;
    loadGame();
    var str1 = "Mode " + mode + ": " + modeTitles[mode];
    str1 = str1.padEnd(30, '.');
    document.getElementById("modeDisplay").innerHTML = str1+"\n";

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

function loadGame() {
    answerShown = false;
    gameLevel = modeLevel;
    question = modeNames[mode]();
    //displayLevel();
    document.getElementById('blinkButton').value = "Toggle Blink " + (blinkMode ? "(on)" : "(off)");
    document.getElementById('reviewButton').value = "Toggle Review " + (reviewMode ? "(on)" : "(off)");
    document.getElementById('verbalButton').value = "Toggle Verbal " + (verbalMode ? "(on)" : "(off)");
    document.getElementById('retainButton').value = "Toggle Retain " + (retainMode ? "(on)" : "(off)");
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
    pointDiff = gameLevel;
    points += gameLevel;
    if (inarow > 5) {
        gameLevel++;
        //cument.cookie=gameLevel;
        inarow = 0;
    }
}

function decrementPoints() {
    var mentalMathThreshold = 5;
    var longerTH = 15;
    inarow--;
    pointDiff = -1.5 * gameLevel;
    if (penaltyMode)
        points += pointDiff;
    if (inarow < -20) {
        mode = (mode + 1) % modeNames.length;
        inarow = 0;
    }
}

function ReadingRecall() {
    modeTitles[mode]= "progiq";
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

async function checkAns() {
    if (event.key === 'Enter') {
        elapsed = endTimer();
        //useless??
        //seconds = seconds + elapsed;
        var answer = document.getElementById('ans');
        var convertedAns;
        var ans2 = document.getElementById('answer2');
        //If typing mode
        // if (mode == 1 && answer.value.length > 0 && answer.value.substring(0, 3) == "add") {
        // }
        //if mode is bridge
        if (modeTitles[mode]== "bridge") {
            convertedAns = answer.value;
        } else if (modeTitles[mode]== "progiq")
        {
            if (answer.value == ans2.value) {
                incrementPoints();
                displayScore(ans2, elapsed)

                colorFeedback('yes');
                loadGame();
                return;
            } else if (answer.value.length == 0) {

                loadGame();
                return;
            } else {
                db = firebase.firestore();

                db.collection("flashcards").add({
                        content: answer.value

                    })
                    .then(function(docRef) {
                        appendLog("Document written with ID: ", docRef.id, " ", answer.value+"\n");
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
                loadGame();
                return;
            }
        } else {
            convertedAns = parseFloat(answer.value)

        }
        if (Math.abs(convertedAns - problem2.answer)<.001 || convertedAns == problem2.answer) {
            incrementPoints();
            displayScore(ans2, elapsed);
            if (!answerShown  && elapsed <= gameLevel+5) {
              if( CurrentHP != null)  await rmDups(CurrentHP.content);
              colorFeedback('yes');
              appendLog("...\n"+foo+" seconds is time limit, you took "+elapsed.toFixed(2));
            }
            else if ( elapsed > gameLevel+5 || (CurrentHP!=null && CurrentHP?.elapsed < elapsed)){
              var foo = CurrentHP?.elapsed == undefined ? gameLevel+5 : CurrentHP?.elapsed;
              appendLog("not quick enough...\n"+foo+" seconds is time limit, you took "+elapsed.toFixed(2));
                colorFeedback('slow');
              sendHardQ();
            }

            loadGame();
        } else {
            decrementPoints();
            displayScore(ans2, elapsed);
            ans2.innerHTML = ans2.innerHTML + "<p> Correct Answer: " + problem2.answer + "</p>"
            answerShown = true;
            colorFeedback('wrong');
            if(modeTitles[mode]!="pointcount") loadGame();
            sendHardQ();
        }
        //Start next pitch
        answer.value = null;
        //never repeat
        pauseQ();
    }
}
function pauseQ(){
  pausedQ.push(CurrentHP?.content);
}
function appendLog(...params) {
    ermsg += "\n"+params;
    //alert(ermsg);
}

function getHardProblems() {

    var i = 0;
    db.collection("hardproblems")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                //appendLog(doc.id, " => ", doc.data());
                HardProblems[i++] = {
                    docID: doc.id,
                    ...doc.data()
                };
            });
            //appendLog("Got Hard Problems "+HardProblems.length)
        })
        .catch(function(error) {
            appendLog("Error getting documents: ", error);
        });

}
async function deleteProblem(c) {

    await db.collection("hardproblems").doc(c.docID).delete().then(function() {
        appendLog("Document successfully deleted! " + c.content);
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

async function rmDups(content) {
    //alert(HardProblems.filter( h => h.content==content).length+ " to remove");
    var foo = HardProblems.filter(h => h.content == content)
    foo.forEach(hp => deleteProblem(hp));
    HardProblems = HardProblems.filter(h => h.content != content)
}
async function getRelevantHP() {
    await getHardProblems();
    hpm = HardProblems.filter(d => d.game == modeTitles[mode]);
    hpm = hpm.filter(d => d.timestamp - Date.now() < -1000 * 3600);
    //remove dups and remove paused q in session
    var bar = [];
    hpm.forEach( d => {
      if(bar.some(e=>e.content==d.content))
      {

      }
      else if (pausedQ.some(e=>e==d.content)){

      }
      else {
        bar.push(d);
      }
    });
    hpm =[];
    hpm = bar;


    CurrentHP = null;
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
    appendLog("Loading hard problem " + CurrentHP.docID.substring(1,4) +": "+CurrentHP.content+" date: "+new Date(CurrentHP.timestamp).toString()+" seconds ago: "+(CurrentHP.timestamp - Date.now())/1000 )
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

function changeRetentionMode(){
  retainMode = !retainMode;
  loadGame();
}
function sendHardQ() {
  if(modeTitles[mode]=="progiq" || modeTitles[mode]== "pointcount" || problem2.ans == "" || retainMode == false) return;
    var db = firebase.firestore();

    db.collection("hardproblems").add({
            content: problem2.desc,
            game: modeTitles[mode],
            answer: problem2.answer,
        timestamp: Date.now(),
        showTime: showTime,
            elapsed: elapsed
        })
        .then(function(docRef) {
            appendLog("Document written with ID: ", docRef.id.substring(1,4)," ",problem2.desc+"\n");
        })
        .catch(function(error) {
            appendLog("Error adding document: ", docRef.id.substring(1,4));
        });

}

function getDuration() {
    var output;
    if (totalTime >= 60) {
        var mins = totalTime / 60;
        output = mins.toFixed(2) + " minutes ";

    } else {
        output = totalTime.toFixed(2) + " seconds ";
    }
    return output;
}

function displayScore(ans2, elapsed) {
    average = points / totalPitches;
    average = average.toFixed(2);
    totalTime += elapsed;
    ans2.innerHTML = '<ul style="list-style-type:none;">' +
        "</li><li>Score: " + pointDiff + "</li><li>Elapsed: " + elapsed.toFixed(2) +
        ' seconds <br><br><li>Total Points: ' +
        points.toFixed(2) + "</li><li>Average Score: " + average + "</li><li>Total Time: " +
        getDuration() + "</li><li>Questions Answered: " + totalPitches + "</li></ul>";
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
    if (isRight=="yes") {
        setColor("green");
    }
    else if (isRight=="slow"){
        setColor("orange");
    }
    else {
        setColor("red");
    }
    window.setTimeout(
        setColor, 2000, "black");
}

function incLevel() {
    gameLevel++;
    modeLevel = gameLevel;
    loadGame();
}

function displayLevel(){

document.getElementById("levelDisplay").innerHTML="Level: "+gameLevel+ " ";
}

async function populateStocks(){

listnames[3].forEach(async (item, i) => {

  pricefoo[i] = await stocks.timeSeries({
symbol: item,
interval: '1min',
amount: 1
});
sleep(20);
});



}
function sleep(duration) {
	return new Promise(resolve => {
		setTimeout(() => {
      loadGame();
			resolve();
		}, duration * 1000)
	})
}
function decLevel() {
    if (gameLevel > 1)
        gameLevel--;
    modeLevel = gameLevel;
    loadGame();
}

function displayInfo(problem2, input, lin2) {
    showQuestion();
    //turn off all timeouts

    for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    if (blinkMode) {
        timeouts.push(window.setTimeout(hideQuestion, modeBlinkDuration[mode] * 1000 + 1500 * gameLevel));
    }
    
    document.getElementById('curMode').innerHTML = input + "<br/>" + lin2 + ermsg;
    document.getElementById('modeDisplay').innerHTML = "Mode " + (mode+1) + " " + modeTitles[mode];
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
function changeReviewMode() {
    reviewMode = !reviewMode;
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
    var str1 = "Mode " + mode + ": " + modeTitles[mode];
    str1 = str1.padEnd(30, ' ');
    document.getElementById("modeDisplay").innerHTML = str1+"\n";
    loadGame();
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
    displayLevel();
    document.getElementById('blinkButton').value = "Toggle Blink " + (blinkMode ? "(on)" : "(off)");

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
    if (inarow < -2) {
        mode = (mode + 1) % modeNames.length;
        inarow = 0;
    }
}

function ReadingRecall() {
    modeTitle = "progiq";
    modeBlinkDuration = 9;

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
        if (modetitle = "pointcount") {
            convertedAns = answer.value;
        } else if (modeTitle == "progiq") {
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
        if (convertedAns == problem2.answer) {
            incrementPoints();
            displayScore(ans2, elapsed)
            if (!answerShown && CurrentHP != null && elapsed <= gameLevel+5) {
                await rmDups(CurrentHP.content)
                colorFeedback('yes');
            }
            else if ( elapsed > gameLevel+5 || CurrentHP?.elapsed < elapsed){
              appendLog("not quick enough...");
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
            if(modeTitle!="pointcount") loadGame();
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
    document.getElementById("problem2").style.font = "10vh arial,serif";
    document.getElementById("problem2").style.color = "black";
}

function displayHardProblem() {

    
    CurrentHP = hpm.sort(function(a, b) {
        return a - b
    })[0];
    blueQuestion();
    problem2.desc = CurrentHP.content;
    problem2.answer = CurrentHP.answer;
    appendLog("Loading hard problem " + CurrentHP.docID.substring(1,4) +": "+CurrentHP.content+" date: "+new Date(CurrentHP.timestamp).toString()+" seconds ago: "+(CurrentHP.timestamp - Date.now())/1000 )
    HardProblems = [];
}

function blueQuestion() {

    document.getElementById("problem2").style.font = "bold 30px arial,serif";
    document.getElementById("problem2").style.color = "blue";
}

function sendHardQ() {
  if(modeTitle=="progiq" || modeTitle == "pointcount" || problem2.ans == "") return;
    var db = firebase.firestore();

    db.collection("hardproblems").add({
            content: problem2.desc,
            game: modeTitle,
            answer: problem2.answer,
            timestamp: Date.now(),
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
    problem2e.style.color = color
    ans2.style.color = color
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

function decLevel() {
    if (gameLevel > 1)
        gameLevel--;
    modeLevel = gameLevel;
    loadGame();
}

function displayInfo(problem2, input, lin2) {
    var problem2e = document.getElementById('problem2');
    problem2e.innerHTML = problem2.desc;
    showQuestion();
    //turn off all timeouts

    for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    if (blinkMode) {
        timeouts.push(window.setTimeout(hideQuestion, modeBlinkDuration[mode] * 1000 + 1500 * gameLevel));
    }
    var fff = document.getElementById('curMode');
    fff.innerHTML = input + "<br/>" + lin2;
    var curLevel = document.getElementById('curLevel');
    curLevel.innerHTML = "Level: " + gameLevel;
}

function displayInfoNoHide(problem2, input, lin2) {
    var problem2e = document.getElementById('problem2');
    problem2e.innerHTML = problem2.desc;
    var fff = document.getElementById('curMode');
    fff.innerHTML = input + "<br/>" + lin2;
    var curLevel = document.getElementById('curLevel');
    curLevel.innerHTML = "Level: " + gameLevel;
}

function changeBlinkMode() {
    blinkMode = !blinkMode;
    loadGame();
    document.getElementById('isBlink').innerHTML = " Blink mode is " + (blinkMode ? "on (hard)" : "off (easy)");
}

function changeMode() {
    //totalPitches = 0;
    seconds = 0;
    //totalTime=0;
    mode = (mode + 1) % totalModes;

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
    gameLevel = modeLevel;
    question = modeNames[mode]();

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
    document.getElementById('problem2').innerHTML = question;
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



function checkAns() {
    if (event.key === 'Enter') {
        var elapsed = endTimer();
        //useless??
        //seconds = seconds + elapsed;
        var answer = document.getElementById('ans');
        var convertedAns;
        var ans2 = document.getElementById('answer2');
        //If typing mode
        // if (mode == 1 && answer.value.length > 0 && answer.value.substring(0, 3) == "add") {
        // }
        //if mode is bridge
        if (modetitle ="pointcount") {
            convertedAns = answer.value;
        } else {
            convertedAns = parseFloat(answer.value)

        }
        if (convertedAns == problem2.answer) {
            incrementPoints();
            displayScore(ans2, elapsed)

            colorFeedback(true);
            loadGame();
        } else {
            decrementPoints();
            displayScore(ans2, elapsed);
            ans2.innerHTML = ans2.innerHTML + "<p> Correct Answer: " + problem2.answer + "</p>"
            colorFeedback(false);
            sendHardQ(question)
            loadGame();
        }
        //Start next pitch
        answer.value = null;
    }
    else{

    }
}
function onKeyPress(){
  var answer = document.getElementById('ans');
  var convertedAns;
  var ans2 = document.getElementById('answer2');
  //If typing mode
  // if (mode == 1 && answer.value.length > 0 && answer.value.substring(0, 3) == "add") {
  // }
  //if mode is bridge

  if (modetitle ="pointcount") {
      convertedAns = answer.value;
  } else {
      convertedAns = parseFloat(answer.value)

  }

  if ( getDigits(convertedAns) >= getDigits(problem2.answer)){
    var elapsed = endTimer();
    if (convertedAns == problem2.answer) {

        incrementPoints();
        displayScore(ans2, elapsed)

        colorFeedback(true);
        loadGame();
    }
    else {
      decrementPoints();
      displayScore(ans2, elapsed);
      ans2.innerHTML = ans2.innerHTML + "<p> Correct Answer: " + problem2.answer + "</p>"
      colorFeedback(false);

      loadGame();
    }
    answer.value = null;
  }

}

function getDigits(number){
  return Math.log(number) * Math.LOG10E + 1 | 0;
}
function sendHardQ(problem) {
    var db = firebase.firestore();

    db.collection("hardproblems").add({
            content: problem,
            game: modeTitle,
            answer: problem2.answer
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
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
    ans2.style.color = color
    answer.style.bordercolor = color
}

function colorFeedback(isRight) {
    if (isRight) {
        setColor("green")
    } else {
        setColor("red")
    }
    window.setTimeout(
        setColor, 2000, "black");
}

function incLevel() {
    gameLevel++;
    modeLevel = gameLevel;
    loadGame();
}

function decLevel() {
    if (gameLevel > 1)
        gameLevel--;
    modeLevel = gameLevel;
    loadGame();
}

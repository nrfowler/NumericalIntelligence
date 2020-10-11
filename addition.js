 async function loadLongAddition() {
      startTimer();
      modeLevel = 1;
      modeTitles.push("longaddition");
      modeBlinkDuration.push(9);
      hpm = [];
      blackFont();
      minTime = 15;
      if (reviewMode) await getRelevantHP();
      if (hpm.length > 0 && reviewMode) {
          displayHardProblem();
      } else {
        var q1 = 0,
            q2 = 0,
            s1 = 0,
            s2 = 0;
        for (var i = 0; i < gameLevel; i++) {
            q1 = Math.round(Math.random() * 8) + 1;
            do {
                q2 = Math.round(Math.random() * (9 - q1)) + q1;
            } while (q1 + q2 < 10)
            s1 += q1 * Math.pow(10, i);
            s2 += q2 * Math.pow(10, i);
        }
      if (verbalMode) {
          smallFont();
          qi = new Array(2);
          qi[0] = getRandomInt(varItems.length);
          qi[1] = getRandomInt(varItems.length, item);
          numItems = 2;
          //displaysuestion();
          var v1 = s1 > 1 ? s1.toString() + " " : "";
          var v2 = s2 > 1 ? s2.toString() + " " : "";
          problem2.desc = "" + v1 + varItems[qi[0]] + " + " + v2 + varItems[qi[1]] + "\n\n";
          problem2.answer = s1 * prices[qi[0]] + s2 * prices[qi[1]];
          answerKey = varItems[qi[0]] + "=" + prices[qi[0]] + " ";
          answerKey += varItems[qi[1]] + "=" + prices[qi[1]];
          displayData();
          //varItems = varItems.reverse();

      } else {


          problem2.desc = " " + s1 + "\n+" + s2;
          problem2.answer = s1 + s2;
      }
}



      totalPitches++;

      lin2 = "";
      //item a and 2 global
      if(dataNames[rand]=="elements") displayElementInfo([qi[0],qi[1]],lin2);
      question = problem2.desc;
      displayInfo(problem2, "");
      document.getElementById('modeDisplay').innerHTML = "Mode: Long Addition";
      return problem2.desc;
  }

  async function loadSerialAddition() {
      startTimer();
      modeLevel = gameLevel;
      problem2 = {
          desc: "",
          answer: ""
      };
      modeTitles.push("serial");
      blackFont();
      //document.cookie[0]=1;
      //gameLevel = parseInt(document.cookie) ?? 1;
      var saLevel = gameLevel + 1;
      var q = new Array(saLevel + 1);
      var i = 0;




      totalPitches++;
      if (verbalMode) {
          displayData();
          displayQuestion();
      } else {

          problem2.desc = " " + q[0];
          problem2.answer = q[0];
          for (var j = 1; j < saLevel; j++) {
              problem2.desc += "\n+" + q[j];
              problem2.answer += q[j];
          }
      }
      lin2 = "";
      question = problem2.desc;
      //if(dataNames[rand]=="elements") displayElementInfo(items,lin2);
      displayInfo(problem2, "");
      document.getElementById('modeDisplay').innerHTML = "Mode: Serial Addition"
      return problem2.desc;
  }

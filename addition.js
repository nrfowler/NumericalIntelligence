 async function LongAddition() {
      startTimer();
      setMode("LongAddition");

      modeBlinkDuration.push(9);
      hpm = [];
      blackFont();
      minTime = 115;
      //if (reviewMode) await getRelevantHP();
      if (hpm.length > 0 && reviewMode) {
          //displayHardProblem();
      } else {
        var q1 = 0,
            q2 = 0,
            s1 = 0,
            s2 = 0;
        for (var i = 0; i < modeLevels[mode]; i++) {
            q1 = Math.round(Math.random() * 8) + 1;
            do {
                q2 = Math.round(Math.random() * (9 - q1)) + q1;
            } while (q1 + q2 < 10)
            s1 += q1 * Math.pow(10, i);
            s2 += q2 * Math.pow(10, i);
        }
      if (verbalMode) {
          smallFont();
          items = new Array(2);
          items[0] = getRandomInt(varItems.length);
          items[1] = getRandomInt(varItems.length, item);
          numItems = 2;
          //displaysuestion();
          var v1 = s1 > 1 ? s1.toString() + " " : "";
          var v2 = s2 > 1 ? s2.toString() + " " : "";
          problem2.desc = "" + v1 + varItems[items[0]] + " + " + v2 + varItems[items[1]] + "\n\n";
          problem2.answer = s1 * prices[items[0]] + s2 * prices[items[1]];
          answerKey = varItems[items[0]] + "=" + prices[items[0]] + " ";
          answerKey += varItems[items[1]] + "=" + prices[items[1]];
          displayData();
          //varItems = varItems.reverse();

      } else {

          s1 = getHardNumber(gameLevel() + 1);
          s2 = getHardNumber(gameLevel() + 1);

          problem2.desc = " " + s1 + "\n+" + s2;
          problem2.answer = s1 + s2;
      }
}



      totalPitches++;

      lin2 = "";
      //item a and 2 global
      // if(dataNames[rand]=="elements") displayElementInfo([items[0],items[1]],lin2);
      question = problem2.desc;
      displayInfo(problem2, "");
      document.getElementById('modeDisplay').innerHTML = "Mode: Long Addition";
      return problem2.desc;
  }

  async function SerialAddition() {
      startTimer();
      setMode("SerialAddition");

      problem2 = {
          desc: "",
          answer: ""
      };
      blackFont();
      //document.cookie[0]=1;
      //modeLevels[mode] = parseInt(document.cookie) ?? 1;
      var saLevel = modeLevels[mode] + 1;
      var q = new Array(saLevel + 1);
      var i = 0;




      totalPitches++;
      if (verbalMode) {
        setItems(modeLevels[mode]+1);
          displayData();
          displayQuestion();
      } else {
          q = createArray(q.length);
          q = q.map(x => getHardNumber(2));
          problem2.desc = q[0];
          problem2.answer = q[0];
          problem2.legend = "";
          for (var j = 1; j < saLevel; j++) {
              problem2.desc += " + " + q[j];
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

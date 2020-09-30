  async function loadLongAddition() {
      startTimer();
      modeLevel= 1;
      modeTitles.push("longaddition");
      modeBlinkDuration.push(9);
      hpm = [];
      blackFont();
      if (reviewMode) await getRelevantHP();
      if (hpm.length > 0  && reviewMode) {
          displayHardProblem();
      } else {
          var q1 = 0,
              q2 = 0, s1 = 0, s2 = 0;
          for (var i = 0; i < gameLevel + 2; i++) {
              q1 = Math.round(Math.random() * 8) + 1;
              do {
                  q2 = Math.round(Math.random() * (9 - q1)) + q1;
              } while (q1 + q2 < 10)
              s1 += q1 * Math.pow(10, i);
              s2 += q2 * Math.pow(10, i);
          }
      }
      if (verbalMode) {
          smallFont();
          var item = getRandomInt(varItems.length);
          var item2 = getRandomInt(varItems.length, item);

          //displayQuestion();
          var v1 = q1 > 1 ? q1.toString()+"*" : "";
          var v2 = q2 > 1 ? q2.toString()+"*"  : "";
          problem2.desc = ""+v1 + varItems[item] + " + " +v2+ varItems[item2] + "\n\n";
          problem2.answer = q1*prices[item]  + q2*prices[item2]
          displayData();
          //varItems = varItems.reverse();

      }
      else {
          problem2.desc = " " + s1 + "\n+" + s2;
          problem2.answer = s1 + s2;
      }




      totalPitches++;

      lin2="";
      question = problem2.desc;
      displayInfo(problem2, "Mode: Long Addition", lin2);
      return problem2.desc;
  }

  async function loadSerialAddition() {
      startTimer();
      modeLevel= gameLevel;
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
        displayQuestion();
          displayData();
      }
      else{

      problem2.desc = " " + q[0];
      problem2.answer = q[0];
      for (var j = 1; j < saLevel; j++) {
          problem2.desc += "\n+" + q[j];
          problem2.answer += q[j];
      }
    }
        lin2="";
        question = problem2.desc;
      displayInfo(problem2, "Mode: Serial Addition", lin2);
      return problem2.desc;
  }
